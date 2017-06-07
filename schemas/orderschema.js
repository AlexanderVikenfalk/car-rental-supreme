const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const order = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    car: { type: Schema.Types.ObjectId, ref: 'car', required: true }
});



const model = module.exports = mongoose.model('Order', order);