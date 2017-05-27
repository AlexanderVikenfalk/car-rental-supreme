const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const car = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    seats: { type: Number, enum: [2, 5, 7], required: true },
    transmission: { type: String, enum: ["automatic", "manual"], required: true },
    roofbox: { type: Boolean, required: true },
    price: { type: Number, required: true }
});

/*
  Get all car objects
  @param (ObjectId) ref brand document _id
*/

// car.methods.all = (cb, properties) => {
//     const prop = properties || {};
//     return model.aggregate([
//         { $match: prop },
//     ], cb);
// };

const model = module.exports = mongoose.model('Car', car);