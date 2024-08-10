const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoxSchema = new Schema({
    boxSize:{
        type: String,
        required : true,
    },
    boxCount:{
        type: Number,
        required : true,
    },
    pricePerBox:{
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

module.exports = mongoose.model('Box', BoxSchema);