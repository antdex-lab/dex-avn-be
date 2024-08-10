const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InkSchema = new Schema({
    color:{
        type: String,
        required: true,
    },
    sizeInKg:{
        type: Number,
        required : true,
    },
    pricePerKg:{
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

module.exports = mongoose.model('Ink', InkSchema);
//