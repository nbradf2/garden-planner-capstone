// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const {Garden} = require('../garden/models');
// const {Journal} = require('../journal/models');
// const {User} = require('..users');
// const {app, runServer, closeServer} = require('../server');
// const {JWT_EXPIRY, JWT_SECRET, TEST_DATABASE_URL} = require('../config');

// const should = chai.should();
// const expect = chai.expect();

// chai.use(chaiHttp);

// describe('Auth endpoints', function() {
// 	const testUsername = 'tester';
// 	const testPassword = 'testertester';

// 	before(function() {
// 		return runServer(TEST_DATABASE_URL);
// 	});

// 	after(function() {
// 		return closeServer();
// 	});

// 	beforeEach(function() {
// 		return User.hashPassword(password).then(password =>
// 			User.create({
// 				testUsername,
// 				testPassword
// 			})
// 		);
// 	});

// 	afterEach(function() {
// 		return User.remove({});
// 	});

// 	function tearDownDb() {
// 		return new Promis((resolve, reject) => {
// 			console.warn('Deleting database');
// 			mongoose.connection.dropDatabase()
// 			.then(result => resolve(result))
// 			.catch(err => reject(err))
// 		});
// 	}

// 	describe('/auth/login', function() {
// 		it('Should reject requests with no credentials', function() {
// 			return chai
// 				.request(app)
// 				.post('/auth/login')
// 				.send({"username": ' ', "password": ' '})
// 				.then(() =>
// 					expect.fail(null, null, 'Request should not succeed')
// 				)
// 				.catch(err => {
// 					if (err instanceof chai.AssertionError) {
// 						throw err;
// 					}

// 					const res = err.response;
// 					expect(res).to.have.status(401);
// 				});
// 		});

// 		// it should reject requests with incorrect user names





// 	})







// })