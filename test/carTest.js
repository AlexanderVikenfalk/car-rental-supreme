const chai = require('chai');
should = chai.should();
request = require('supertest');
mocha = require('mocha');
app = require('../app.js');
chaiHttp = require('chai-http');

let Car = require('../schemas/carschema');

chai.use(chaiHttp);

describe('Posting Car', () => {


    it('it should not POST a car without brand ', (done) => {
        let car = {
            model: "S4",
            seats: 5,
            transmission: true,
            price: 600,
            roofrack: true
        }
        chai.request(app)
            .post('/createcar')
            .send(car)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('brand');
                res.body.errors.brand.should.have.property('kind').eql('required');
                done();
            });
    });

    it('it should POST a Car ', (done) => {
        let car = {
            model: "S4",
            seats: 5,
            automat: true,
            price: 600,
            brand: "SAAB",
            roofrack: true
        }

        chai.request(app)
            .post('/createcar')
            .send(car)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Car successfully added!');
                res.body.should.have.property('car');
                res.body.car.should.have.property('model');
                res.body.car.should.have.property('seats');
                res.body.car.should.have.property('automat');
                res.body.car.should.have.property('roofrack');
                res.body.car.should.have.property('price');
                done();
            });
    });
});

describe('Deleting Car', () => {
    it('it should DELETE a car via ID', (done) => {
        let car = new Car({
            model: "S4",
            seats: 5,
            automat: true,
            price: 600,
            brand: "SAAB",
            roofrack: true
        })
        car.save((err, car) => {
            chai.request(app)
                .delete('/deletecar/' + car.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Car deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                    done();
                });
        });
    });
});