const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CuttingSchema = new Schema({
    printingSizeAsPerPrintingRoll:{
        type: String,
        required : true,
    },
    countForRoll:{
        type: String,
        required : true,
    },
    inkUsed:{
        type: Number,
        required : true,
    },
    corePerRoll:{
        type: Number,
        required : true,
    },
    coreSize:{
        type: Number,
        required : true,
    },
    cuttingDateOfEntry:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Cutting', CuttingSchema);
//