const router = require('express').Router();
const pool = require('../db');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { protect, checkAdmin } = require('./token');

// Get All User
// @desc    Get user
// @route   get /api/user/
// @access  Private and admin
router.get('/', asyncHandler(async(req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      client.release();
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
}));

// Delete a User
// @desc    Delete user
// @route   delete /api/user/delete/:id
// @access  Private and admin
router.delete('/:id',asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect();

    // Use parameterized query to prevent SQL injection
    const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *'; 
    const result = await client.query(deleteQuery, [id]);
    client.release();

    // If no rows are deleted, it means the user did not exist
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the deleted user or a success message
    res.json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}));

// Update User Information
// @desc    Update user details
// @route   PUT /api/user/update
// @access  Private (or Public depending on your authentication setup)
router.put('/update', protect, asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming you are getting the user's id from the request
  const { name, email, password } = req.body;

  try {
      // Fetch user from the database
      const userQueryResult = await pool.query('SELECT * FROM Users WHERE id = $1', [userId]);

      if (userQueryResult.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      let user = userQueryResult.rows[0];

      // Prepare values for the update
      const updatedName = name || user.name;
      const updatedEmail = email || user.email;
      let updatedPassword = user.password;

      if (password) {
          // Hash new password
          const salt = await bcrypt.genSalt(10);
          updatedPassword = await bcrypt.hash(password, salt);
      }

      // Update the user in the database
      const updateQuery = 'UPDATE USERS SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email';
      const updatedUser = await pool.query(updateQuery, [updatedName, updatedEmail, updatedPassword, userId]);

      res.json({
          id: updatedUser.rows[0].id,
          name: updatedUser.rows[0].name,
          email: updatedUser.rows[0].email,
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
  }
}));








module.exports = router;
