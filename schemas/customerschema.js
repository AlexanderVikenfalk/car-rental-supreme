const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const customer = new Schema({
    foreName: { type: String, required: true },
    surName: { type: String, required: true },
    ssn: { type: Number, required: true, unique: true },
    phoneNumber: { type: Number, required: false },
    emailAddress: { type: String, required: false }
});


const model = module.exports = mongoose.model('Customer', customer);