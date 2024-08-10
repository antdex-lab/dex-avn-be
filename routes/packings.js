const express = require('express');
const router = express.Router();
const Packing = require('../models/packing');

// Create a new Packing item
router.post('/', async (req, res) => {
    try {
        const newPacking = new Packing(req.body);
        const savedPacking = await newPacking.save();
        res.json(savedPacking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Packing items
router.get('/', async (req, res) => {
    try {
        const packings = await Packing.find();
        res.json(packings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Packing item
router.put('/:id', async (req, res) => {
    try {
        const updatedPacking = await Packing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedPacking) {
            return res.status(404).json({ message: 'Packing item not found' });
        }
        res.json(updatedPacking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Packing item
router.delete('/:id', async (req, res) => {
    try {
        const deletedPacking = await Packing.findByIdAndDelete(req.params.id);
        if (!deletedPacking) {
            return res.status(404).json({ message: 'Packing item not found' });
        }
        res.json({ message: 'Packing item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
