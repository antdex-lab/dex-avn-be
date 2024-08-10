const express = require('express');
const router = express.Router();
const zFold = require('../models/zFold');

// Create a new zFold item
router.post('/', async (req, res) => {
    try {
        const newZFold = new zFold(req.body);
        const savedZFold = await newZFold.save();
        res.json(savedZFold);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all zFold items
router.get('/', async (req, res) => {
    try {
        const zFolds = await zFold.find();
        res.json(zFolds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific zFold item
router.put('/:id', async (req, res) => {
    try {
        const updatedZFold = await zFold.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedZFold) {
            return res.status(404).json({ message: 'zFold item not found' });
        }
        res.json(updatedZFold);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific zFold item
router.delete('/:id', async (req, res) => {
    try {
        const deletedZFold = await zFold.findByIdAndDelete(req.params.id);
        if (!deletedZFold) {
            return res.status(404).json({ message: 'zFold item not found' });
        }
        res.json({ message: 'zFold item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
