const router = require('express').Router();
const pool = require('../db');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//Note to self: protected routesssss

// Get All Employees
// @desc    Get employees
// @route   GET /api/employee/
// @access  Private and admin
router.get('/', asyncHandler(async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

router.get('/crews', asyncHandler(async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE where type = \'crew\'');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

router.get('/managers', asyncHandler(async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE WHERE type = \'manager\'');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));


router.get('/pilots', asyncHandler(async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE where type = \'pilot\'');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

router.get('/engineers', asyncHandler(async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE where type = \'engineer\'');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

// Delete an Employee
// @desc    Delete employee
// @route   DELETE /api/employee/delete/:id
// @access  Private and admin
router.delete('/delete/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM EMPLOYEE WHERE employeeId = $1 RETURNING *';
    const result = await pool.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully", employee: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

// Update Employee Information
// @desc    Update employee details
// @route   PUT /api/employee/update/:employeeId
// @access  Private
router.put('/update/:employeeId', asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const { name, email, password, managerId } = req.body;

  try {
    const employeeQueryResult = await pool.query('SELECT * FROM EMPLOYEE WHERE employeeId = $1', [employeeId]);

    if (employeeQueryResult.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    let employee = employeeQueryResult.rows[0];

    const updatedName = name || employee.name;
    const updatedEmail = email || employee.email;
    let updatedPassword = employee.password;
    const updatedManagerId = managerId !== undefined ? managerId : employee.managerId;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }

    const updateQuery = 'UPDATE EMPLOYEE SET name = $1, email = $2, password = $3, managerId = $4 WHERE employeeId = $5 RETURNING employeeId, name, email, managerId';
    const updatedEmployee = await pool.query(updateQuery, [updatedName, updatedEmail, updatedPassword, updatedManagerId, employeeId]);

    res.json({
      employeeId: updatedEmployee.rows[0].employeeId,
      name: updatedEmployee.rows[0].name,
      email: updatedEmployee.rows[0].email,
      managerId: updatedEmployee.rows[0].managerId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}));


// Get an Employee by employeeId
// @desc    Get employee by employeeId
// @route   GET /api/employee/:employeeId
// @access  Private
router.get('/:employeeId', asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await pool.query('SELECT * FROM EMPLOYEE WHERE employeeId = $1', [employeeId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

module.exports = router;
