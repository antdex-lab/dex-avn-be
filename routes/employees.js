const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// @route   POST api/employees
// @desc    Add a new employee
router.post('/', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET api/employees
// @desc    Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
