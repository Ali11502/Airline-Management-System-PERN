const router = require('express').Router();
const pool = require('../db');

// Create a new flight
router.post('/create', async (req, res) => {
  const {
      aircraftId,
      dep,
      arr,
      depTime,
      arrTime,
      avbSeats,
      date,
      status,
      duration,
      price
  } = req.body;

  try {
      const newFlight = await pool.query(
          'INSERT INTO Flight (aircraftid, dep, arr, deptime, arrtime, avbseats, date, status, duration, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [
              aircraftId,
              dep,
              arr,
              depTime,
              arrTime,
              avbSeats,
              date,
              status,
              duration,
              price
          ]
      );
      res.status(201).json(newFlight.rows[0]);
  } catch (error) {
      res.status(500).json(error);
  }
});

// Update a flight
router.put('/update/:flightid', async (req, res) => {
  const { flightid } = req.params;

  const {
    aircraftId,
    dep,
    arr,
    depTime,
    arrTime,
    avbSeats,
    date,
    status,
    duration,
    price
  } = req.body;

  try {
    const updatedFlight = await pool.query(
      'UPDATE Flight SET aircraftid = $1, dep = $2, arr = $3, deptime = $4, arrtime = $5, avbseats = $6, date = $7, status = $8, duration = $9, price = $10 WHERE flightid = $11 RETURNING *',
      [
        aircraftId,
        dep,
        arr,
        depTime,
        arrTime,
        avbSeats,
        date,
        status,
        duration,
        price,
        flightid
      ]
    );

    if (updatedFlight.rows.length === 0) {
      return res.status(404).json('Flight not found');
    }

    res.status(200).json(updatedFlight.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a flight
router.delete('/delete/:flightid', async (req, res) => {
  const { flightid } = req.params;

  try {
      const deleteFlight = await pool.query(
          'DELETE FROM Flight WHERE flightid = $1 RETURNING *',
          [flightid]
      );

      if (deleteFlight.rows.length === 0) {
          return res.status(404).json('Flight not found');
      }

      res.status(200).json('Flight deleted successfully');
  } catch (error) {
      res.status(500).json(error);
  }
});

// Get Scheduled flights
router.get('/all', async (req, res) => {
  try {
    const allFlights = await pool.query('SELECT * FROM Flight ORDER BY date ASC');
    res.status(200).json(allFlights.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Flights
router.get('/', async (req, res) => {
  try {
    const scheduledFlights = await pool.query(
      'SELECT * FROM Flight WHERE status = $1 ORDER BY date ASC',
      ['Scheduled']
    );

    res.status(200).json(scheduledFlights.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Get a specific flight by ID
router.get('/:flightid', async (req, res) => {
  const { flightid } = req.params;

  try {
      const flight = await pool.query('SELECT * FROM Flight WHERE flightid = $1', [flightid]);

      if (flight.rows.length === 0) {
          return res.status(404).json('Flight not found');
      }

      res.status(200).json(flight.rows[0]);
  } catch (error) {
      res.status(500).json(error);
  }
});

router.get('/flightsByReservation/:reservationid', async (req, res) => {
  const { reservationid } = req.params;

  try {
    const query = `
      SELECT Flight.*
      FROM Flight
      INNER JOIN Reservation ON Flight.flightid = Reservation.flightid
      WHERE Reservation.reservationid = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [reservationid]);

    if (rows.length === 0) {
      // No flight found for the given reservation ID
      return res.status(404).json({ message: 'Flight not found for the reservation' });
    }

    res.json({ flight: rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/complete/:flightid', async (req, res) => {
  const { flightid } = req.params;

  try {
    const completedFlight = await pool.query(
      'UPDATE Flight SET status = $1 WHERE flightid = $2 RETURNING *',
      ['Completed', flightid]
    );

    if (completedFlight.rows.length === 0) {
      return res.status(404).json('Flight not found');
    }

    res.status(200).json(completedFlight.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/search-flights', async (req, res) => {
  const { dep_date, dep_city, arr_city } = req.body;
  console.log(req.body);

  try {
    const result = await pool.query(
      'SELECT * FROM search_flights($1, $2, $3)',
      [dep_date, dep_city, arr_city]
    );

    res.json({ flights: result.rows });
  } catch (error) {
    console.error('Error executing search_flights:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
