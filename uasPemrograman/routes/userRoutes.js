// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, authenticateUser } = require('../controllers/authController');  // Mengimpor controller
const router = express.Router();

// Route untuk register pengguna
router.post('/register', registerUser);

// Route untuk login pengguna
router.post('/login', loginUser);

// Route untuk melihat profil pengguna yang sudah login
router.get('/profile', authenticateUser, (req, res) => {
  res.json({
    message: 'Welcome to the profile route',
    userId: req.userId  // Mengirimkan informasi pengguna yang sedang login
  });
});

module.exports = router;
