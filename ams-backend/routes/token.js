const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const pool = require('../db');

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    // Get the token from the request's cookies
    token = req.cookies.jwt;
  
    if (token) {
      try {
        // Verify the token using your JWT_SECRET
        const decoded = jwt.verify(token, 'umair');
  
        // Query the database to get the user based on the decoded user ID
        const userQueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
  
        if (userQueryResult.rows.length === 0) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }
  
        // Attach the user object to the request without the password
        req.user = userQueryResult.rows[0];
        
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });
  
// Middleware to check if user is an admin
const checkAdmin = (req, res, next) => {
    // Check if the user is logged in (using the protect middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
  
    // Check if the user is an admin based on the isAdmin field
    if (req.user.isadmin===false) {
      return res.status(403).json({ message: 'Not authorized, user is not an admin' });
    }
  
    // If both checks pass, the user is logged in and is an admin
    next();
  };

module.exports = {protect, checkAdmin};