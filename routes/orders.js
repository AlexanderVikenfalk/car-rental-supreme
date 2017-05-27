const Order = require('../schemas/orderschema');
const Car = require('../schemas/carschema');
const connection = require('../dbconnection')(require('mongoose'));

module.exports = (app) => {
    // Manually create new order
    app.post('/createorder', (req, res) => {
        const order = new Order({
            customer: req.body.customer,
            from: req.body.from,
            to: req.body.to,
            car: req.body.car
        });
        order.save().then((doc) => {
            console.log("New order added ", doc);
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });


    // Search if car exists
    app.get('/searchorder', (req, res) => {
        Car.find({ brand: req.query.brand, model: req.query.model, seats: req.query.seats }, function(err, car) {
            if (err) {
                res.send(err);
            }
            res.json(car);
        });

    });



};