const express = require('express');
const router = express.Router();
const Box = require('../models/box');

// Create a new Box item
router.post('/', async (req, res) => {
    try {
        const newBox = new Box(req.body);
        const savedBox = await newBox.save();
        res.json(savedBox);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Box items
router.get('/', async (req, res) => {
    try {
        const boxes = await Box.find();
        res.json(boxes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Box item
router.put('/:id', async (req, res) => {
    try {
        const updatedBox = await Box.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedBox) {
            return res.status(404).json({ message: 'Box item not found' });
        }
        res.json(updatedBox);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Box item
router.delete('/:id', async (req, res) => {
    try {
        const deletedBox = await Box.findByIdAndDelete(req.params.id);
        if (!deletedBox) {
            return res.status(404).json({ message: 'Box item not found' });
        }
        res.json({ message: 'Box item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all Box items
router.get('/total-count', async (req, res) => {
    try {
        const totalCount = await Box.aggregate([
            {
                $group: {
                    _id: null, // No grouping by any specific field
                    totalCount: { $sum: "$boxCount" } // Sum the boxCount field for all items
                }
            }
        ]);
        res.json(totalCount.length ? totalCount[0].totalCount : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count per size
router.get('/total-count-per-size', async (req, res) => {
    try {
        const totalCountPerSize = await Box.aggregate([
            {
                $group: {
                    _id: "$boxSize", // No grouping by any specific field
                    totalCountPerSize: { $sum: "$boxCount" } // Sum the boxCount field for all items
                }
            }
        ]);
        res.json(totalCountPerSize.length ? totalCountPerSize[0].totalCountPerSize : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
