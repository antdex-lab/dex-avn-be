const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackingSchema = new Schema({
    labelPerRoll:{
        type: Number, //number of rolls
        required: true,
    },
    withBox:{
        type: Boolean,
    },
    withoutBox:{
        type: Boolean,
    },
    dateOfEntry:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Packing', PackingSchema);
//