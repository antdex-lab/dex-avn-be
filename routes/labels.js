const express = require('express');
const router = express.Router();
const Label = require('../models/label');

// Create a new Label item
router.post('/', async (req, res) => {
    try {
        const newLabel = new Label(req.body);
        const savedLabel = await newLabel.save();
        res.json(savedLabel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Label items
router.get('/', async (req, res) => {
    try {
        const labels = await Label.find();
        res.json(labels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Label item
router.put('/:id', async (req, res) => {
    try {
        const updatedLabel = await Label.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedLabel) {
            return res.status(404).json({ message: 'Label item not found' });
        }
        res.json(updatedLabel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Label item
router.delete('/:id', async (req, res) => {
    try {
        const deletedLabel = await Label.findByIdAndDelete(req.params.id);
        if (!deletedLabel) {
            return res.status(404).json({ message: 'Label item not found' });
        }
        res.json({ message: 'Label item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all Label items
router.get('/total-count', async (req, res) => {
    try {
        const totalCount = await Label.aggregate([
            {
                $group: {
                    _id: null, // No grouping by any specific field
                    totalCount: { $sum: "$labelCount" } // Sum the labelCount field for all items
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
        const totalCountPerSize = await Label.aggregate([
            {
                $group: {
                    _id: "$labelSize", // No grouping by any specific field
                    totalCountPerSize: { $sum: "$labelCount" } // Sum the labelCount field for all items
                }
            }
        ]);
        res.json(totalCountPerSize.length ? totalCountPerSize[0].totalCountPerSize : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
