const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrintingSchema = new Schema({
    printingSizePerJumboRoll:{
        type: String,
        required : true,
    },
    printingSize:{
        type: String,
        required : true,
    },
    inkUsed:{
        type: Number,
        required : true,
    },
    dateOfEntry:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Printing', PrintingSchema);
//