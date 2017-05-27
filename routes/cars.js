const Car = require('../schemas/carschema');
const connection = require('../dbconnection')(require('mongoose'));

module.exports = (app) => {
    app.get('/cars', (req, res) => {
        let car = new Car();
        car.all((error, cars) => {
            res.render('cars', { cars: cars });
        });
    });

    app.post('/createcar', (req, res) => {
        const car = new Car({
            brand: req.body.brand,
            model: req.body.model,
            seats: req.body.seats,
            transmission: req.body.transmission,
            roofbox: req.body.roofbox,
            price: req.body.price
        });
        car.save(error => {
            if (error) console.log(error)
            else {
                car.save();
                res.send("Done");
            };
        });

    });

    // Update car values via Car ID
    app.patch('/:id', (req, res) => {
        Car.findByIdAndUpdate(req.params.id, {
                brand: req.body.brand,
                model: req.body.model,
                seats: req.body.seats,
                transmission: req.body.transmission,
                roofbox: req.body.roofbox,
                price: req.body.price
            },
            (error, result) => {
                if (error) res.send(error);
                res.send(result);
            });
    });

    //SortOnPrice Asc
    app.get('/sortonpriceasc', (req, res) => {
        Car.find()
            .sort({ price: 'asc' })
            .exec((error, Car) => {
                res.render('cars', { cars: Car });

            });
    });

    //SortOnPrice Desc
    app.get('/sortonpricedesc', (req, res) => {
        Car.find()
            .sort({ price: 'desc' })
            .exec((error, Car) => {
                // console.log("DESC" + Car);
                // let car = new Car();
                res.render('cars', { cars: Car });
            });
    });

    //SFilter transmission type
    app.get('/filtertransmission', (req, res) => {
        Car.find()
            // Funkar ej
            .where('transmission').equals(req.url.trans)
            .exec((Car) => {
                res.render('cars', { cars: Car });
            });
    });


};