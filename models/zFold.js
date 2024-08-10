const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zFoldSchema = new Schema({
    jumboEntry:{
        type: String,
        required : true,
    },
    modelSize:{
        type: String,
        required : true,
    },
    actualPacketPerJumboRoll:{
        type: Number,
        required : true,
    },
    manufacturedPacketPerJumboRoll:{
        type: Number,
        required : true,
    },
    difference:{
        type: Number,
        required : true,
    },
    DateOfEntry:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('zFold', zFoldSchema);
//