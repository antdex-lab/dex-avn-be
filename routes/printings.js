const express = require('express');
const router = express.Router();
const Printing = require('../models/printing');

// Create a new Printing item
router.post('/', async (req, res) => {
    try {
        const newPrinting = new Printing(req.body);
        const savedPrinting = await newPrinting.save();
        res.json(savedPrinting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Printing items
router.get('/', async (req, res) => {
    try {
        const printings = await Printing.find();
        res.json(printings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a specific Printing item
router.put('/:id', async (req, res) => {
    try {
        const updatedPrinting = await Printing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedPrinting) {
            return res.status(404).json({ message: 'Printing item not found' });
        }
        res.json(updatedPrinting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific Printing item
router.delete('/:id', async (req, res) => {
    try {
        const deletedPrinting = await Printing.findByIdAndDelete(req.params.id);
        if (!deletedPrinting) {
            return res.status(404).json({ message: 'Printing item not found' });
        }
        res.json({ message: 'Printing item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
