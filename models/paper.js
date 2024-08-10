const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaperSchema = new Schema({
    sizeInMM:{
        type: Number,
        required: true,
    },
    sizeInMeter:{
        type: Number,
        required : true,
    },
    totalSQM:{
        type: Number,
        required : true,
    },
    gsm:{
        type: String,
        required : true,
    },
    count:{
        type: Number,
        required : true,
    },
    pricePerSquareMeters:{
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

module.exports = mongoose.model('Paper', PaperSchema);