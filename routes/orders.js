const Order = require('../schemas/orderschema');
const Car = require('../schemas/carschema');
const Customer = require('../schemas/customerschema');

let dateFrom;
let dateTo;


// const connection = require('../dbconnection')(require('mongoose'));

module.exports = (app) => {
    // Create new order, but first create user
    app.post('/createorder', (req, res) => {
        let carid = req.body.carid;
        let ssn = req.body.ssn;
        const customer = new Customer({
            foreName: req.body.forename,
            surName: req.body.surname,
            ssn: req.body.ssn,
            phoneNumber: req.body.phonenumer,
            emailAddress: req.body.emailaddress
        });

        // Saving customer
        customer.save().then((doc) => {
            // finding id for new customer
            Customer.findOne({ "ssn": { $eq: ssn } }).then((results) => {
                let customerid = results._id;
                console.log(results);
                //creating order with CustomerID and CarID
                console.log("dateFrom" + dateFrom + "DateTo" + dateTo)
                const order = new Order({
                    customer: customerid,
                    from: dateFrom,
                    to: dateTo,
                    car: carid
                });
                // Saving Order
                order.save().then((doc) => {
                    let test = doc._id;
                    console.log("New order added ", test);
                    return test;
                }).then(function(test) {

                    res.render('success', { success: test });
                });


            });


        });
    });



    // Check if there are cars booked the desired date
    app.post('/searchdate', (req, res) => {
        // Sending variables as globals to access them later
        dateFrom = req.body.dateFrom;
        dateTo = req.body.dateTo;
        Order.find({
                from: { '$gte': dateFrom },
                to: { '$lte': dateTo }
            },
            // saves linked carids from Order-schema in "ids"
            (error, docs) => {
                if (error) console.log(error);
                let ids = docs.map(function(doc) { return doc.car; });

                // compares IDs in cars with those in "booking" and return cars that arent booked
                Car.find({ _id: { $nin: ids } }, function(err, availablecars) {

                    res.render('availablecars', { availablecars: availablecars });
                });

            });
    });






};