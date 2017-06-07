module.exports = (app) => {
    app.post('/signup', (req, res) => {
        res.render('signup', { carid: req.body.carid });
    });
};