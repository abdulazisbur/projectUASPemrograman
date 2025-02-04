// models/userModel.js
const db = require('../config/db');  // Mengimpor pool koneksi database
const bcrypt = require('bcryptjs');

class User {
  // Method untuk mencari pengguna berdasarkan email
  static findByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);  // Mengembalikan user yang ditemukan
    });
  }

  // Method untuk membuat pengguna baru
  static create(name, email, handphone, password, callback) {
    // Hash password sebelum disimpan
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err, null);

      const query = 'INSERT INTO users (name, email, handphone, password) VALUES (?, ?, ?, ?)';
      db.execute(query, [name, email, handphone, hashedPassword], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);  // Mengembalikan hasil query setelah user berhasil dibuat
      });
    });
  }

  // Method untuk memverifikasi password pengguna saat login
  static verifyPassword(storedPassword, inputPassword, callback) {
    bcrypt.compare(inputPassword, storedPassword, (err, isMatch) => {
      if (err) return callback(err, null);
      callback(null, isMatch);  // Mengembalikan apakah password cocok atau tidak
    });
  }
}

module.exports = User;
