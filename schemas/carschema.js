const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const car = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    seats: { type: Number, enum: [2, 5, 7], required: true },
    automat: { type: Boolean, required: true },
    roofrack: { type: Boolean, required: true },
    price: { type: Number, required: true }
});



const model = module.exports = mongoose.model('Car', car);