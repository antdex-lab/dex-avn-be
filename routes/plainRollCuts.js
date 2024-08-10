const express = require('express');
const router = express.Router();
const PlainRollCut = require('../models/plainRoll');

// Create a new PlainRollCut item
router.post('/', async (req, res) => {
    try {
        const newPlainRollCut = new PlainRollCut(req.body);
        const savedPlainRollCut = await newPlainRollCut.save();
        res.json(savedPlainRollCut);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all PlainRollCut items
router.get('/', async (req, res) => {
    try {
        const plainRollCuts = await PlainRollCut.find();
        res.json(plainRollCuts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific PlainRollCut item
router.put('/:id', async (req, res) => {
    try {
        const updatedPlainRollCut = await PlainRollCut.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedPlainRollCut) {
            return res.status(404).json({ message: 'PlainRollCut item not found' });
        }
        res.json(updatedPlainRollCut);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific PlainRollCut item
router.delete('/:id', async (req, res) => {
    try {
        const deletedPlainRollCut = await PlainRollCut.findByIdAndDelete(req.params.id);
        if (!deletedPlainRollCut) {
            return res.status(404).json({ message: 'PlainRollCut item not found' });
        }
        res.json({ message: 'PlainRollCut item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
