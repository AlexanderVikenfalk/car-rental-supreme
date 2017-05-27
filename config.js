module.exports = {

    server: {
        port: process.env.PORT || 3000
    },
    // database url
    db: {
        dsn: "mongodb://user1:881225_aw@ds052629.mlab.com:52629/firsttest"
    },
    session: {
        secret: "secret",
        resave: false,
        saveUninitialized: true

    }
};