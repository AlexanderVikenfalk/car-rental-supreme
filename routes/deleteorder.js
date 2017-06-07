const Order = require('../schemas/orderschema');

module.exports = (app) => {
    app.get('/manageorder', (req, res) => {
        res.render('manageorder');
    });


    // Find order via ID and remove it
    app.get('/deleteorder', (req, res) => {
        Order.findByIdAndRemove(req.query.id, function(err, response) {
            if (err)
                res.json(err);
            else if (response === null) {
                res.render('manageorder', { notfound: 'Ordern kunde ej hittas!' });
            } else
                res.render('manageorder', { success: 'Order borttagen!' });
        });
    });
};