const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    rawMaterial:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required : true,
    },
    labelSize:{
        type: Number,
        required : true,
    },
    labelCount:{
        type: Number,
        required : true,
    },
    pricePerLabel:{
        type: Number,
        required : true,
    },
    dateOfEntry:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Label', LabelSchema);
//