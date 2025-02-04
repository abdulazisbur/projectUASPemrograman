// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');  // Mengimpor pool koneksi database

// Fungsi untuk register pengguna baru
const registerUser = (req, res) => {
  const { name, email, handphone, password } = req.body;

  // Validasi input
  if (!name || !email || !handphone || !password) {
    return res.status(400).json({ message: 'Name, email, handphone, and password are required' });
  }

  // Hash password sebelum disimpan
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Query untuk memasukkan pengguna ke dalam tabel users
    const query = 'INSERT INTO users (name, email, handphone, password) VALUES (?, ?, ?, ?)';
    db.execute(query, [name, email, handphone, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Fungsi untuk login pengguna
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Query untuk mencari pengguna berdasarkan email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.execute(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Cek password yang dimasukkan dengan password yang tersimpan
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

// Fungsi untuk mengautentikasi pengguna dengan token JWT
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verifikasi token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Menyimpan informasi user yang terverifikasi dalam request untuk digunakan selanjutnya
    req.userId = decoded.id;
    next();  // Lanjut ke middleware atau route berikutnya
  });
};

module.exports = { registerUser, loginUser, authenticateUser };
