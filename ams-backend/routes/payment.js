const router = require('express').Router();
const pool = require('../db');



router.post('/processPayment', async (req, res) => {
  try {
    const {
      reservationid,
      id,
      pstatus,
      pamount,
      pdate,
      ptime,
    } = req.body;

    // Call the process_payment_and_update_reservation stored procedure
    const result = await pool.query('CALL process_payment_and_update_reservation($1, $2, $3, $4, $5, $6)', [
      reservationid,
      id,
      pstatus,
      pamount,
      pdate,
      ptime,
    ]);

    res.status(200).json({ message: 'Payment processed successfully'});
  } catch (error) {
    console.error('Error processing payment and updating reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// New route for getting payments by flightid
router.get('/byFlight/:flightid', async (req, res) => {
  try {
    const { flightid } = req.params;

    // Retrieve payments related to the specified flightid
    const payments = await pool.query('SELECT * FROM Payment WHERE reservationid IN (SELECT reservationid FROM Reservation WHERE flightid = $1)', [flightid]);

    res.status(200).json(payments.rows);
  } catch (error) {
    console.error('Error retrieving payments by flightid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  





module.exports = router;
