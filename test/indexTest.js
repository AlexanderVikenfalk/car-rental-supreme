const chai = require('chai');
should = chai.should();
request = require('supertest');
mocha = require('mocha');
app = require('../app.js');

describe('Index routes', () => {

    it('should return status 200 and content type:html/text', (done) => {

        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});