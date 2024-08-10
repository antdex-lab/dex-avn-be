const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardboardSchema = new Schema({
    cardboardSize:{
        type: String,
        required : true,
    },
    cardboardCount:{
        type: Number,
        required : true,
    },
    pricePerCardboard:{
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

module.exports = mongoose.model('Cardboard', CardboardSchema);
//