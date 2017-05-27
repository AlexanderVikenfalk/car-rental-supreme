const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const user = new Schema({
    foreName: { type: String, required: true },
    surName: { type: String, required: true },
    ssn: { type: Number, required: true },
    phoneNumber: { type: Number, required: false },
    emailAddress: { type: String, required: false }
});


const model = module.exports = mongoose.model('User', user);