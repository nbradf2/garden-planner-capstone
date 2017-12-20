const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {Garden} = require('../garden/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

describe('Garden Planner', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should return response 200 and html', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.html;
			});
	})
})
