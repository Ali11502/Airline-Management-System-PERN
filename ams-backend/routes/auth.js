const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');


const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, 'umair', {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};


// @desc    Register User / clear cookie
// @route   POST /api/auth/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userExists.rows.length > 0) {
            return res.status(401).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, isadmin) VALUES ($1, $2, $3, $4) RETURNING id, name, email, isadmin',
            [name, email, hashedPassword, isAdmin || false]
        );

        // Generate token here as per your logic and respond
        generateToken(res, newUser.rows[0].id);

        res.status(201).json({
            id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            isAdmin: newUser.rows[0].isadmin,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}));


// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const userQueryResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (userQueryResult.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const user = userQueryResult.rows[0];
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        generateToken(res, user.id); // Assuming generateToken is defined similarly
  
        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isadmin,
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }));


// @desc    Auth Admin & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/loginAdmin', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userQueryResult = await pool.query('SELECT * FROM users WHERE email = $1 AND isAdmin = true', [email]);

    if (userQueryResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or youre not an admin' });
    }

    const user = userQueryResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      generateToken(res, user.id); // Assuming generateToken is defined similarly

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isadmin,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}));

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', asyncHandler((req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  }));

module.exports = router;