const db = require("../config/db");

class QuestionModel {
    // 🔹 Menambahkan pertanyaan baru
    static async create(question, options, answer) {
        const query = "INSERT INTO questions (question, options, answer) VALUES (?, ?, ?)";
        try {
            const [result] = await db.promise().execute(query, [question, JSON.stringify(options), answer]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Mendapatkan semua pertanyaan
    static async getAll() {
        const query = "SELECT * FROM questions";
        try {
            const [rows] = await db.promise().execute(query);
            return rows.map(row => {
                row.options = JSON.parse(row.options);
                return row;
            });
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Mendapatkan pertanyaan berdasarkan ID
    static async getById(id) {
        const query = "SELECT * FROM questions WHERE id = ?";
        try {
            const [rows] = await db.promise().execute(query, [id]);
            if (rows.length > 0) {
                rows[0].options = JSON.parse(rows[0].options);
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Memperbarui pertanyaan berdasarkan ID
    static async update(id, question, options, answer) {
        const query = "UPDATE questions SET question = ?, options = ?, answer = ? WHERE id = ?";
        try {
            const [result] = await db.promise().execute(query, [question, JSON.stringify(options), answer, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Menghapus pertanyaan berdasarkan ID
    static async delete(id) {
        const query = "DELETE FROM questions WHERE id = ?";
        try {
            const [result] = await db.promise().execute(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuestionModel;
