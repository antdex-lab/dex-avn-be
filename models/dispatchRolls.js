const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DispatchRollSchema = new Schema({
    rollSize:{
        type: String,
        required : true,
    },
    noOfRollPerSize:{
        type: Number,
        required : true,
    },
    orderBy:{
        type: String,
        required : true,
    },
    DateAndTime:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('DispatchRoll', DispatchRollSchema);
//