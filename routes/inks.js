const express = require('express');
const router = express.Router();
const Ink = require('../models/ink');

// Create a new Ink item
router.post('/', async (req, res) => {
    try {
        const newInk = new Ink(req.body);
        const savedInk = await newInk.save();
        res.json(savedInk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Ink items
router.get('/', async (req, res) => {
    try {
        const inks = await Ink.find();
        res.json(inks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Ink item
router.put('/:id', async (req, res) => {
    try {
        const updatedInk = await Ink.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedInk) {
            return res.status(404).json({ message: 'Ink item not found' });
        }
        res.json(updatedInk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Ink item
router.delete('/:id', async (req, res) => {
    try {
        const deletedInk = await Ink.findByIdAndDelete(req.params.id);
        if (!deletedInk) {
            return res.status(404).json({ message: 'Ink item not found' });
        }
        res.json({ message: 'Ink item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all Ink items
router.get('/total-count', async (req, res) => {
    try {
        const totalCount = await Ink.aggregate([
            {
                $group: {
                    _id: null, // No grouping by any specific field
                    totalCount: { $sum: "$sizeInKg" } // Sum the sizeInKg field for all items
                }
            }
        ]);
        res.json(totalCount.length ? totalCount[0].totalCount : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all Ink items
router.get('/total-count-by-color', async (req, res) => {
    try {
        const totalCountByColor = await Ink.aggregate([
            {
                $group: {
                    _id: "$color", // No grouping by any specific field
                    totalCountByColor: { $sum: "$sizeInKg" } // Sum the sizeInKg field for all items
                }
            }
        ]);
        res.json(totalCountByColor.length ? totalCountByColor[0].totalCountByColor : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
