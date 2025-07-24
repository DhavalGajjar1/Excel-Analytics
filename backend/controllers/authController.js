// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const sendMail = require('../utils/mailer');

// const otpStore = {}; // Temporary memory store

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     if (role === 'admin') {
//       const adminExists = await User.findOne({ role: 'admin' });
//       if (adminExists) return res.status(403).json({ message: 'Only one admin allowed' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashed, role });
//     res.status(201).json({ message: 'Registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'Email not found' });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // valid for 5 min

//     await sendMail(email, 'Your OTP for Password Reset', `Your OTP is: ${otp}`);
//     res.json({ message: 'OTP sent to email' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.verifyOtp = (req, res) => {
//   const { email, otp } = req.body;
//   const record = otpStore[email];

//   if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   res.json({ message: 'OTP verified' });
// };

// exports.createNewPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   const record = otpStore[email];
//   if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   try {
//     const hashed = await bcrypt.hash(newPassword, 10);
//     await User.findOneAndUpdate({ email }, { password: hashed });
//     delete otpStore[email];
//     res.json({ message: 'Password updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mailer');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (role === 'admin') {
      const adminExists = await User.findOne({ role: 'admin' });
      if (adminExists) return res.status(403).json({ message: 'Only one admin allowed' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Send OTP and store in DB
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendMail(email, 'Your OTP for Password Reset', `Your OTP is: ${otp}`);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Verify OTP from DB
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await Otp.findOne({ email });

    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reset password
exports.createNewPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = await Otp.findOne({ email });

    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    await Otp.deleteOne({ email });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
