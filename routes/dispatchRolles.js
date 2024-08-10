const express = require('express');
const router = express.Router();
const DispatchRoll = require('../models/dispatchRolls');

// Create a new DispatchRoll item
router.post('/', async (req, res) => {
    try {
        const newDispatchRoll = new DispatchRoll(req.body);
        const savedDispatchRoll = await newDispatchRoll.save();
        res.json(savedDispatchRoll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all DispatchRoll items
router.get('/', async (req, res) => {
    try {
        const dispatchRolls = await DispatchRoll.find();
        res.json(dispatchRolls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific DispatchRoll item
router.put('/:id', async (req, res) => {
    try {
        const updatedDispatchRoll = await DispatchRoll.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedDispatchRoll) {
            return res.status(404).json({ message: 'DispatchRoll item not found' });
        }
        res.json(updatedDispatchRoll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific DispatchRoll item
router.delete('/:id', async (req, res) => {
    try {
        const deletedDispatchRoll = await DispatchRoll.findByIdAndDelete(req.params.id);
        if (!deletedDispatchRoll) {
            return res.status(404).json({ message: 'DispatchRoll item not found' });
        }
        res.json({ message: 'DispatchRoll item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
