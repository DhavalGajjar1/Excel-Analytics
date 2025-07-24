const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route for any logged-in user
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

// Admin-only route
router.get('/admin', protect, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user });
});

module.exports = router;
