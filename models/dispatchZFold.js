const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DispatchZSchema = new Schema({
    packetModelPerSize:{
        type: String,
        required : true,
    },
    noOfpacket:{
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

module.exports = mongoose.model('DispatchZ', DispatchZSchema);
//