// controllers/questionController.js
const Question = require('../models/questionModel');

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { question, options, answer } = req.body;
        const questionId = await Question.create(question, options, answer);
        res.status(201).json({ id: questionId, question, options, answer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.getAll();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.getById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
    try {
        const { question, options, answer } = req.body;
        const updated = await Question.update(req.params.id, question, options, answer);
        if (!updated) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ id: req.params.id, question, options, answer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
    try {
        const deleted = await Question.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
