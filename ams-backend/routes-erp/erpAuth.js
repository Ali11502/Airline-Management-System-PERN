const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const generateToken = (res, employeeId) => {
  const token = jwt.sign({ employeeId }, 'umair', {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// @desc    Register Employee / clear cookie
// @route   POST /api/employee/register
// @access  Public
// Common function to add an employee
const addEmployee = async (req, res, type) => {
  const { managerid, name, email, password } = req.body;

  try {
    // Check if employee already exists
    const employeeExists = await pool.query('SELECT * FROM EMPLOYEE WHERE email = $1', [email]);

    if (employeeExists.rows.length > 0) {
      return res.status(401).json({ message: 'Employee already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new employee
    const newEmployee = await pool.query(
      'INSERT INTO EMPLOYEE (managerid, name, email, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING employeeId, name, email, type',
      [managerid, name, email, hashedPassword, type]
    );

    res.status(201).json({
      employeeId: newEmployee.rows[0].employeeId,
      name: newEmployee.rows[0].name,
      email: newEmployee.rows[0].email,
      type: newEmployee.rows[0].type,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Route for adding a manager
router.post('/add-manager', asyncHandler(async (req, res) => {
  await addEmployee(req, res, 'manager');
}));

// Route for adding a pilot
router.post('/add-pilot', asyncHandler(async (req, res) => {
  await addEmployee(req, res, 'pilot');
}));

// Route for adding a crew member
router.post('/add-crew', asyncHandler(async (req, res) => {
  await addEmployee(req, res, 'crew');
}));

// Route for adding an engineer
router.post('/add-engineer', asyncHandler(async (req, res) => {
  await addEmployee(req, res, 'engineer');
}));


// @desc    Auth Employee & get token
// @route   POST /api/employee/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if employee exists
    const employeeQueryResult = await pool.query('SELECT * FROM EMPLOYEE WHERE email = $1', [email]);

    if (employeeQueryResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const employee = employeeQueryResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, employee.password);

    if (isMatch) {
      generateToken(res, employee.employeeId);

      res.json({
        employeeid: employee.employeeid,
        name: employee.name,
        email: employee.email,
        type: employee.type,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}));

// @desc    Logout employee / clear cookie
// @route   POST /api/employee/logout
// @access  Public
router.post('/logout', asyncHandler((req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
}));

module.exports = router;
