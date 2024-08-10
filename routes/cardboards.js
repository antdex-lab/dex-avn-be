const express = require('express');
const router = express.Router();
const Cardboard = require('../models/cardboard');

// Create a new Cardboard item
router.post('/', async (req, res) => {
    try {
        const newCardboard = new Cardboard(req.body);
        const savedCardboard = await newCardboard.save();
        res.json(savedCardboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Cardboard items
router.get('/', async (req, res) => {
    try {
        const cardboards = await Cardboard.find();
        res.json(cardboards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Cardboard item
router.put('/:id', async (req, res) => {
    try {
        const updatedCardboard = await Cardboard.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedCardboard) {
            return res.status(404).json({ message: 'Cardboard item not found' });
        }
        res.json(updatedCardboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Cardboard item
router.delete('/:id', async (req, res) => {
    try {
        const deletedCardboard = await Cardboard.findByIdAndDelete(req.params.id);
        if (!deletedCardboard) {
            return res.status(404).json({ message: 'Cardboard item not found' });
        }
        res.json({ message: 'Cardboard item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all Cardboard items
router.get('/total-count', async (req, res) => {
    try {
        const totalCount = await Cardboard.aggregate([
            {
                $group: {
                    _id: null, // No grouping by any specific field
                    totalCount: { $sum: "$cardboardCount" } // Sum the cardboardCount field for all items
                }
            }
        ]);
        res.json(totalCount.length ? totalCount[0].totalCount : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Total Count Per Size
router.get('/total-count-per-size', async (req, res) => {
    try {
        const totalCountPerSize = await Cardboard.aggregate([
            {
                $group: {
                    _id: "$cardboardSize", // No grouping by any specific field
                    totalCountPerSize: { $sum: "$cardboardCount" } // Sum the cardboardCount field for all items
                }
            }
        ]);
        res.json(totalCountPerSize.length ? totalCountPerSize[0].totalCountPerSize : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
