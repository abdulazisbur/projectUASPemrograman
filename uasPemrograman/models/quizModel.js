const db = require("../config/db");

class QuizModel {
    // 🔹 Menambahkan quiz baru
    static async create(title, description) {
        const query = "INSERT INTO quizzes (title, description) VALUES (?, ?)";
        try {
            const [result] = await db.promise().execute(query, [title, description]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Mendapatkan semua quiz
    static async getAll() {
        const query = "SELECT * FROM quizzes";
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Mendapatkan quiz berdasarkan ID
    static async getById(id) {
        const query = "SELECT * FROM quizzes WHERE id = ?";
        try {
            const [rows] = await db.promise().execute(query, [id]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Memperbarui quiz berdasarkan ID
    static async update(id, title, description) {
        const query = "UPDATE quizzes SET title = ?, description = ? WHERE id = ?";
        try {
            const [result] = await db.promise().execute(query, [title, description, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Menghapus quiz berdasarkan ID
    static async delete(id) {
        const query = "DELETE FROM quizzes WHERE id = ?";
        try {
            const [result] = await db.promise().execute(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuizModel;
