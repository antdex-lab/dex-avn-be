const express = require('express');
const router = express.Router();
const Core = require('../models/core');

// Create a new Core item
router.post('/', async (req, res) => {
    try {
        const newCore = new Core(req.body);
        const savedCore = await newCore.save();
        res.json(savedCore);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Core items
router.get('/', async (req, res) => {
    try {
        const cores = await Core.find();
        res.json(cores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a Core item
router.put('/:id', async (req, res) => {
    try {
        const updatedCore = await Core.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedCore) {
            return res.status(404).json({ message: 'Core item not found' });
        }
        res.json(updatedCore);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a Core item
router.delete('/:id', async (req, res) => {
    try {
        const deletedCore = await Core.findByIdAndDelete(req.params.id);
        if (!deletedCore) {
            return res.status(404).json({ message: 'Core item not found' });
        }
        res.json({ message: 'Core item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all Core items
router.get('/total-count', async (req, res) => {
    try {
        const totalCount = await Core.aggregate([
            {
                $group: {
                    _id: null, // No grouping by any specific field
                    totalCount: { $sum: "$noOfCores" } // Sum the noOfCores field for all items
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
        const totalPerCount = await Core.aggregate([
            {
                $group: {
                    _id: "$size", // No grouping by any specific field
                    totalPerCount: { $sum: "$noOfCores" } // Sum the noOfCores field for all items
                }
            }
        ]);
        res.json(totalPerCount.length ? totalPerCount[0].totalPerCount : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
