const router = require('express').Router();
const pool = require('../db');

// Create Aircraft
router.post('/create', async (req, res) => {
  const { aname, totalseats, astatus } = req.body;

  try {
    const newAircraft = await pool.query(
      'INSERT INTO Aircraft (aname, totalseats, astatus) VALUES ($1, $2, $3) RETURNING *',
      [aname, totalseats, astatus]
    );

    res.status(201).json(newAircraft.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Aircraft
router.delete('/:aircraftid', async (req, res) => {
    const { aircraftid } = req.params;

  try {
    const deleteAircraft = await pool.query(
      'DELETE FROM Aircraft WHERE aircraftid = $1 RETURNING *',
      [aircraftid]
    );

    if (deleteAircraft.rows.length === 0) {
      return res.status(404).json('Aircraft not found');
    }

    res.status(200).json('Aircraft deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Aircraft
router.get('/', async (req, res) => {
  try {
    const allAircraft = await pool.query('SELECT * FROM Aircraft');
    res.status(200).json(allAircraft.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Specific Aircraft
router.get('/:aircraftid', async (req, res) => {
  const { aircraftid } = req.params;

  try {
    const aircraft = await pool.query('SELECT * FROM Aircraft WHERE aircraftid = $1', [aircraftid]);
    res.status(200).json(aircraft.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Aircraft
router.put('/:aircraftid', async (req, res) => {
    const { aircraftid } = req.params;
  const { aname, totalseats, astatus } = req.body;

  try {
    const updateAircraft = await pool.query(
      'UPDATE Aircraft SET aname = $1, totalseats = $2, astatus = $3 WHERE aircraftid = $4 RETURNING *',
      [aname, totalseats, astatus, aircraftid]
    );

    if (updateAircraft.rows.length === 0) {
      return res.status(404).json('Aircraft not found');
    }

    res.status(200).json(updateAircraft.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
