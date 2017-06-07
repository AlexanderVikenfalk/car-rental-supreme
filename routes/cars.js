const Car = require('../schemas/carschema');

// Returns all cars and renders them
module.exports = (app) => {
    app.get('/cars', (req, res) => {
        Car.find({}, (error, cars) => {
            if (error) res.send(error);
            res.render('cars', { cars: cars });
        });
    });

    // Manually create car
    app.post('/createcar', (req, res) => {
        const car = new Car({
            brand: req.body.brand,
            model: req.body.model,
            seats: req.body.seats,
            automat: req.body.automat,
            roofrack: req.body.roofrack,
            price: req.body.price
        });
        car.save(error => {
            if (error) res.send(error)
            else {
                car.save();
                res.json({ message: "Car successfully added!", car });
            };
        });

    });

    // Update car values via Car ID
    app.patch('/:id', (req, res) => {
        Car.findByIdAndUpdate(req.params.id, {
                brand: req.body.brand,
                model: req.body.model,
                seats: req.body.seats,
                automat: req.body.automat,
                roofrack: req.body.roofbox,
                price: req.body.price
            },
            (error, car) => {
                if (error) res.send(error);
                else {
                    res.json({ message: "Car updated!", car });
                }
            });
    });


    // Delete Car
    app.delete('/deletecar/:id', (req, res) => {
        Car.remove({ _id: req.params.id }, (err, result) => {
            if (err) res.send(error);
            else {
                res.json({ message: "Car deleted!", result });
            }
        });
    });

    //SORT FUNCTIONS


    //Filters car based on "price", "roofrack" and "transmission"
    app.get('/filters', (req, res) => {
        Car.find()
            .where('roofrack', req.query.roofrack)
            .where('automat', req.query.transmisson)
            .sort({ price: req.query.price })
            .exec((error, Car) => {
                if (error) res.send(error)
                console.log(Car);
                res.render('cars', { cars: Car });
            });
    });



};