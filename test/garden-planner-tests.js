const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {Garden} = require('../garden/models');
const {Journal} = require('../journal/models');
const {app, runServer, closeServer} = require('../server');
const {JWT_EXPIRY, JWT_SECRET, TEST_DATABASE_URL} = require('../config');

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

let loginDetails = {
	'username': 'tester',
	'password': 'testertester'
}

let testUsername = 'tester';

let testPassword = 'testertester'

let authToken;

function seedGardenData() {
	console.info('seeding garden data');
	const seedData = [];

	for (let i=1; i<10; i++) {
		seedData.push(generateGardenData());
	}
	return Garden.insertMany(seedData);
}

// used to generate a username to put in db
// function generateTestUser() {
// 	const testUser = app.createOne();
// 	return User.create(testUser);
// }

// used to generate a plantName to put in db
function generatePlantName() {
	const plantNames = [
	'Tomato', 'Cucumber', 'Eggplant'];
	return plantNames[Math.floor(Math.random() * plantNames.length)];
}

// used to generate a startDate to put in db
function generateStartDate() {
	const startDates = [
	'01/01/01', '02/02/02', '03/03/03'];
	return startDates[Math.floor(Math.random() * startDates.length)];
}

// used to generate a harvestDate to put in db
function generateHarvestDate() {
	const harvestDates = [
	'07/07/07', '08/08/08', '09/09/09'];
	return harvestDates[Math.floor(Math.random() * harvestDates.length)];
}

// used to generate comments to put in db
function generateComments() {
	const comments = [
	'Plant with basil', 'Needs full sun', 'Plant away from onions'];
	return comments[Math.floor(Math.random() * comments.length)];
}

// generate object representing a plant unit
function generateGardenData() {
	return {
		user: testUsername,
		name: generatePlantName(),
		startDate: generateStartDate(),
		harvestDate: generateHarvestDate(),
		comments: generateComments()
	}
}

// tear down database called in an 'afterEach block'

function tearDownDb() {
	return new Promise((resolve, reject) => {
		console.warn("deleting test database");
		mongoose.connection
			.dropDatabase()
			.then(result => resolve(result))
			.catch(err => reject(err));
	});
}

// TESTS
describe('Garden API resourse', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});
	
	after(function() {
		return closeServer();
	});

	describe('/POST Login', () => {
	it('should Login, and check token', (done) => {
		chai.request(app)
			.post('/auth/login')
			.send(loginDetails)
			.then((err, res) => {
				res.should.have.status(200);
				authToken = res.body.authToken;
				console.log(res.body.authToken);
				// login
				chai.request(app)
			})
			done();
		})
	})

	describe('Test all endpoints', function() {
		beforeEach(function() {
			return seedGardenData();
		});
		afterEach(function() {
			return tearDownDb();
		});

		it('GET/garden should return all existing plants', function(done) {
			return new Promise((resolve, reject) => {
				return chai.request(app)
					.get('/garden')
					.set('Authorization', `Bearer ${authToken}`)
			

			})





			// let res;
			// return chai.request(app)
			// 	.get('/garden')
			// 	.set('Authorization', `Bearer ${authToken}`)
			// 	.then(function(_res) {
			// 		res = _res;
			// 		res.should.have.status(200);
			// 		res.body.should.have.length.of.at.least(1);
			// 		return Garden.count();
			// 	})
			// 	.then(function(count) {
			// 		res.body.should.have.length.of(count);
			// 	});
			// 	done();
		});







	})

})

