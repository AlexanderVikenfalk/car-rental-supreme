var config = require('./config');

module.exports = (mongoose) => {
    let connection = mongoose.connect(config.db.dsn);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });
    return mongoose;
};