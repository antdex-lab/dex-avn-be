const express = require('express');
const router = express.Router();
const Cutting = require('../models/cutting');

// Create a new Cutting item
router.post('/', async (req, res) => {
    try {
        const newCutting = new Cutting(req.body);
        const savedCutting = await newCutting.save();
        res.json(savedCutting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Cutting items
router.get('/', async (req, res) => {
    try {
        const cuttings = await Cutting.find();
        res.json(cuttings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Cutting item
router.put('/:id', async (req, res) => {
    try {
        const updatedCutting = await Cutting.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedCutting) {
            return res.status(404).json({ message: 'Cutting item not found' });
        }
        res.json(updatedCutting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Cutting item
router.delete('/:id', async (req, res) => {
    try {
        const deletedCutting = await Cutting.findByIdAndDelete(req.params.id);
        if (!deletedCutting) {
            return res.status(404).json({ message: 'Cutting item not found' });
        }
        res.json({ message: 'Cutting item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
