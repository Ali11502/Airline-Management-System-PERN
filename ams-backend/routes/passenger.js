const router = require('express').Router();
const pool = require('../db');

router.post('/passenger', async (req, res) => {
    const {
        id,
        name,
        phone,
        email,
        passport,
        dob,
        gender
    } = req.body;

    try {
        const newPassenger = await pool.query(
            'INSERT INTO Passenger (id, name, phone, email, passport, dob, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [id, name, phone, email, passport, dob, gender]
        );

        res.status(201).json(newPassenger.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/passenger', async (req, res) => {
    try {
        const passengers = await pool.query('SELECT * FROM Passenger');
        res.status(200).json(passengers.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/passenger/:passengerid', async (req, res) => {
    const { passengerid } = req.params;

    try {
        const passenger = await pool.query('SELECT * FROM Passenger WHERE passengerid = $1', [passengerid]);

        if (passenger.rows.length === 0) {
            return res.status(404).json('Passenger not found');
        }

        res.status(200).json(passenger.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/passenger/:passengerid', async (req, res) => {
    const { passengerid } = req.params;
    const {
        id,
        name,
        phone,
        email,
        passport,
        dob,
        gender
    } = req.body;

    try {
        const updatePassenger = await pool.query(
            'UPDATE Passenger SET id = $1, name = $2, phone = $3, email = $4, passport = $5, dob = $6, gender = $7 WHERE passengerid = $8 RETURNING *',
            [id, name, phone, email, passport, dob, gender, passengerid]
        );

        if (updatePassenger.rows.length === 0) {
            return res.status(404).json('Passenger not found');
        }

        res.status(200).json(updatePassenger.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/passenger/:passengerid', async (req, res) => {
    const { passengerid } = req.params;

    try {
        const deletePassenger = await pool.query('DELETE FROM Passenger WHERE passengerid = $1 RETURNING *', [passengerid]);

        if (deletePassenger.rows.length === 0) {
            return res.status(404).json('Passenger not found');
        }

        res.status(200).json('Passenger deleted successfully');
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
