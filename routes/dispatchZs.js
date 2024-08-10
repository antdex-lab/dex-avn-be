const express = require('express');
const router = express.Router();
const DispatchZ = require('../models/dispatchZFold');

// Create a new DispatchZ item
router.post('/', async (req, res) => {
    try {
        const newDispatchZ = new DispatchZ(req.body);
        const savedDispatchZ = await newDispatchZ.save();
        res.json(savedDispatchZ);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all DispatchZ items
router.get('/', async (req, res) => {
    try {
        const dispatchZs = await DispatchZ.find();
        res.json(dispatchZs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific DispatchZ item
router.put('/:id', async (req, res) => {
    try {
        const updatedDispatchZ = await DispatchZ.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedDispatchZ) {
            return res.status(404).json({ message: 'DispatchZ item not found' });
        }
        res.json(updatedDispatchZ);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific DispatchZ item
router.delete('/:id', async (req, res) => {
    try {
        const deletedDispatchZ = await DispatchZ.findByIdAndDelete(req.params.id);
        if (!deletedDispatchZ) {
            return res.status(404).json({ message: 'DispatchZ item not found' });
        }
        res.json({ message: 'DispatchZ item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
