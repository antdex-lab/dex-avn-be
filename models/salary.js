const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SalarySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    salary:{
        type: Number,
        required : true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Salary', SalarySchema);
//