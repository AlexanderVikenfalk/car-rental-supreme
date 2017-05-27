const Order = require('./schema/order');
// const connection = require('../../dbconnection')(require('mongoose'));

module.exports = (app) => {
    // db.connection.close();
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
};