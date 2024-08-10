const express = require('express');
const router = express.Router();
const Paper = require('../models/paper');


// Create a new Paper item
router.post('/', async (req, res) => {
    try {
        const newPaper = new Paper(req.body);
        const Paper = await newPaper.save();
        res.json(Paper);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Paper items
router.get('/', async (req, res) => {
    try {
        const papers = await Paper.find();
        res.json(papers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update a Paper item
router.put('/:id', async (req, res) => {
    try {
        const updatedPaper = await Paper.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedPaper) {
            return res.status(404).json({ message: 'Paper item not found' });
        }
        res.json(updatedPaper);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a Paper item
router.delete('/:id', async (req, res) => {
    try {
        const deletedPaper = await Paper.findByIdAndDelete(req.params.id);
        if (!deletedPaper) {
            return res.status(404).json({ message: 'Paper item not found' });
        }
        res.json({ message: 'Paper item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of all paper items
router.get('/total-count', async (req, res) => {
    try {
        const totalCount = await Paper.aggregate([
            {
                $group: {
                    _id: null, // No grouping by any specific field
                    totalCount: { $sum: "$count" } // Sum the count field for all items
                }
            }
        ]);
        res.json(totalCount.length ? totalCount[0].totalCount : 0);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count of paper items based on the same GSM
router.get('/count-by-gsm', async (req, res) => {
    try {
        const paperCounts = await Paper.aggregate([
            {
                $group: {
                    _id: "$gsm", // Group by GSM
                    totalCount: { $sum: "$count" } // Calculate total count
                }
            }
        ]);
        res.json(paperCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total count per total square meters (totalSQM)
router.get('/total-count-per-sqm', async (req, res) => {
    try {
        const paperCounts = await Paper.aggregate([
            {
                $group: {
                    _id: "$totalSQM", // Group by totalSQM
                    totalCount: { $sum: "$count" } // Calculate total count
                }
            }
        ]);
        res.json(paperCounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;