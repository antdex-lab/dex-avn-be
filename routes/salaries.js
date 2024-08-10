const express = require('express');
const router = express.Router();
const Salary = require('../models/salary');

// Create a new Salary item
router.post('/', async (req, res) => {
    try {
        const newSalary = new Salary(req.body);
        const savedSalary = await newSalary.save();
        res.json(savedSalary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Salary items
router.get('/', async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.json(salaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Salary item
router.put('/:id', async (req, res) => {
    try {
        const updatedSalary = await Salary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedSalary) {
            return res.status(404).json({ message: 'Salary item not found' });
        }
        res.json(updatedSalary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Salary item
router.delete('/:id', async (req, res) => {
    try {
        const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
        if (!deletedSalary) {
            return res.status(404).json({ message: 'Salary item not found' });
        }
        res.json({ message: 'Salary item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
