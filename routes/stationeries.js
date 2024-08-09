const express = require('express');
const router = express.Router();
const Stationery = require('../models/stationery');


// Create a new stationery item
router.post('/', async (req, res) => {
    try {
        const newStationery = new Stationery(req.body);
        const stationery = await newStationery.save();
        res.json(stationery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all stationery items
router.get('/', async (req, res) => {
    try {
        const stationeries = await Stationery.find();
        res.json(stationeries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Calculate total stationery amount based on the time filter
// For the day: /total-amount?filter=day
// For the week: /total-amount?filter=week
// For the month: /total-amount?filter=month
// For the year: /total-amount?filter=year
router.get('/total-amount', async (req, res) => {
    const { filter } = req.query;

    let matchCondition = {};
    const today = new Date();

    switch (filter) {
        case 'day':
            matchCondition = {
                dateOfEntry: {
                    $gte: new Date(today.setHours(0, 0, 0, 0)),
                    $lt: new Date(today.setHours(23, 59, 59, 999))
                }
            };
            break;

        case 'week':
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(today.setDate(today.getDate() + (6 - today.getDay())));
            matchCondition = {
                dateOfEntry: {
                    $gte: startOfWeek,
                    $lt: endOfWeek
                }
            };
            break;

        case 'month':
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            matchCondition = {
                dateOfEntry: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            };
            break;

        case 'year':
            const startOfYear = new Date(today.getFullYear(), 0, 1);
            const endOfYear = new Date(today.getFullYear(), 11, 31);
            matchCondition = {
                dateOfEntry: {
                    $gte: startOfYear,
                    $lt: endOfYear
                }
            };
            break;

        default:
            return res.status(400).json({ message: 'Invalid filter provided' });
    }

    try {
        const totalAmount = await Stationery.aggregate([
            { $match: matchCondition },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.json({ totalAmount: totalAmount[0]?.total || 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a stationery item
router.put('/:id', async (req, res) => {
    try {
        const updatedStationery = await Stationery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedStationery) {
            return res.status(404).json({ message: 'Stationery item not found' });
        }
        res.json(updatedStationery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a stationery item
router.delete('/:id', async (req, res) => {
    try {
        const deletedStationery = await Stationery.findByIdAndDelete(req.params.id);
        if (!deletedStationery) {
            return res.status(404).json({ message: 'Stationery item not found' });
        }
        res.json({ message: 'Stationery item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;