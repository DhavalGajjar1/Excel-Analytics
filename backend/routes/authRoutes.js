const authController = require('../controllers/authController');
const express = require('express');
const {
  register,
  login,
  sendOtp,
  verifyOtp,
  createNewPassword
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);             // Shared register
router.post('/login', login);                   // Shared login
router.post('/forgot-password', sendOtp);       // Send OTP
router.post('/verify-otp', verifyOtp);          // Verify OTP
router.post('/create-new-password', createNewPassword); // Create new password
router.post('/new-password', authController.createNewPassword);


module.exports = router;
