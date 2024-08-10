const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoreSchema = new Schema({
    noOfCores:{
        type: Number,
        required : true,
    },
    size:{
        type: Number,
        required : true,
    },
    pricePerCore:{
        type: Number,
        required : true,
    },
    totalPrice:{
        type: Number,
        required : true,
    },
    dateOfEntry:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Core', CoreSchema);
//