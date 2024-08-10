const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationerySchema = new Schema({
    item: {
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required : true,
    },
    purchaseby: {
        type: String,
    },
    count: {
        type: String,
    },
    dateOfEntry: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Stationery', StationerySchema);
//