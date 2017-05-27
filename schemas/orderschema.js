const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const order = new Schema({
    intID: { type: Number, required: false },
    customer: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
    from: { type: Date, required: false },
    to: { type: Date, required: false },
    car: { type: Schema.Types.ObjectId, ref: 'car', required: false }
});

const model = module.exports = mongoose.model('Order', order);