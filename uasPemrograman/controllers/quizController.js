//UNTUK CRUD QUIZ DAN SOALNYA

const Quiz = require('../models/quizModel');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, description } = req.body;
        const quizId = await Quiz.create(title, description);
        res.status(201).json({ id: quizId, title, description });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.getAll();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.getById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updated = await Quiz.update(req.params.id, title, description);
        if (!updated) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ id: req.params.id, title, description });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
    try {
        const deleted = await Quiz.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};