# Quiz Application

## Cara Menggunakan Quiznya

1. **Menambahkan Pertanyaan Baru**
   - Endpoint: `POST /api/questions`
   - Body:
     ```json
     {
       "question": "Apa ibu kota Indonesia?",
       "options": ["Jakarta", "Bandung", "Surabaya", "Medan"],
       "answer": "Jakarta"
     }
     ```

2. **Mendapatkan Semua Pertanyaan**
   - Endpoint: `GET /api/questions`

3. **Mendapatkan Pertanyaan Berdasarkan ID**
   - Endpoint: `GET /api/questions/:id`

4. **Memperbarui Pertanyaan Berdasarkan ID**
   - Endpoint: `PUT /api/questions/:id`
   - Body:
     ```json
     {
       "question": "Apa ibu kota Indonesia?",
       "options": ["Jakarta", "Bandung", "Surabaya", "Medan"],
       "answer": "Jakarta"
     }
     ```

5. **Menghapus Pertanyaan Berdasarkan ID**
   - Endpoint: `DELETE /api/questions/:id`

// ...existing content...
