const router = require('express').Router();
const pool = require('../db');
const { protect } = require('./token');
const asyncHandler = require('express-async-handler');

router.post('/tentative-reservation', asyncHandler(async (req, res) => {
  try {
    const {
      id,
      name,
      phone,
      email,
      passport,
      dob,
      gender,
      flightid,
      date,
      time
    } = req.body;

    // Call the create_passenger_and_reservation function
    const result = await pool.query('SELECT tentative_reservation($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
      id,
      name,
      phone,
      email,
      passport,
      dob,
      gender,
      flightid,
      date,
      time
    ]);

    // Extract the reservationid from the result
    const reservationid = result.rows[0].tentative_reservation;

    res.status(200).json({ message: 'Passenger and reservation created successfully', reservationid });
  } catch (error) {
    console.error('Error creating passenger and reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

router.post('/cancel-reservation', async (req, res) => {
  try {
    const { reservationid } = req.body;

    // Call the cancel_reservation stored procedure
    const result = await pool.query('CALL cancel_reservation($1)', [reservationid]);

    res.status(200).json({ message: 'Reservation canceled successfully' });
  } catch (error) {
    console.error('Error canceling reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/', async (req, res) => {
    try {
      const getAllReservationsQuery = `
        SELECT *
        FROM reservation
      `;
      const reservationsResult = await pool.query(getAllReservationsQuery);
      res.status(200).json(reservationsResult.rows);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:reservationId', async (req, res) => {
    try {
      const { reservationId } = req.params;
      const { passengerId, flightId, userId, date, time, status } = req.body;
  
      const updateReservationQuery = `
        UPDATE reservation
        SET passengerId = $1, flightId = $2, userId = $3, date = $4, time = $5, status = $6
        WHERE reservationId = $7
        RETURNING *
      `;
      const updateReservationResult = await pool.query(updateReservationQuery, [
        passengerId,
        flightId,
        userId,
        date,
        time,
        status,
        reservationId,
      ]);
  
      if (updateReservationResult.rows.length === 0) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
  
      res.status(200).json(updateReservationResult.rows[0]);
    } catch (error) {
      console.error('Error updating reservation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.delete('/:reservationId', async (req, res) => {
    try {
      const { reservationId } = req.params;
  
      const deleteReservationQuery = `
        DELETE FROM reservation
        WHERE reservationId = $1
      `;
      const deleteReservationResult = await pool.query(deleteReservationQuery, [reservationId]);
  
      if (deleteReservationResult.rowCount === 0) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/passenger/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const getPassengerByUserQuery = `
        SELECT *
        FROM Passenger
        WHERE id = $1
      `;
      const passengersResult = await pool.query(getPassengerByUserQuery, [id]);
  
      res.status(200).json(passengersResult.rows);
    } catch (error) {
      console.error('Error fetching reservations by for user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/reservation/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const getReservationsByUserQuery = `
        SELECT reservationid
        FROM reservation
        WHERE passengerid = $1
      `;
      const reservationsResult = await pool.query(getReservationsByUserQuery, [id]);
  
      res.status(200).json(reservationsResult.rows);
    } catch (error) {
      console.error('Error fetching reservations by for user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/:flightId', async (req, res) => {
    try {
      const { flightId } = req.params;
  
      const getReservationsByFlightQuery = `
        SELECT *
        FROM reservation
        WHERE flightId = $1
      `;
      const reservationsResult = await pool.query(getReservationsByFlightQuery, [flightId]);
  
      res.status(200).json(reservationsResult.rows);
    } catch (error) {
      console.error('Error fetching reservations by flight:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/status/:reservationid', async (req, res) => {
    const { reservationid } = req.params;
  
    try {
      const query = 'SELECT status FROM Reservation WHERE reservationid = $1';
      const { rows } = await pool.query(query, [reservationid]);
  
      if (rows.length === 0) {
        // No reservation found with the provided ID
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      const { status } = rows[0];
  
      // Check if the status is either "Confirmed" or "Waiting"
      let isConfirmedOrWaiting = false;

      if(status==='Confirmed'){
        isConfirmedOrWaiting = true;
      }
  
      res.json({ isConfirmedOrWaiting });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/reservationByFlight/:flightid', async (req, res) => {
      const { flightid } = req.params;
    
      try {
        const result = await pool.query(
          'SELECT * FROM Reservation WHERE flightid = $1',
          [flightid]
        );
    
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).send('Internal Server Error');
      }
    });
    
    
    
  
  
  


module.exports = router;
