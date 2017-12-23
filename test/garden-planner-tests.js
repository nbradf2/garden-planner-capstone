const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
// which would be my server?
const server = '';

const {Garden} = require('../garden/models');
const {app, runServer, closeServer} = require('../server');
const {JWT_EXPIRY, JWT_SECRET, TEST_DATABASE_URL} = require('../config');

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

let loginDetails = {
	'username': 'tester',
	'password': 'testertester'
}

let registerDetails = {
	'firstName': 'testerFirstName',
	'lastName': 'testingLastName',
	'username': 'tester',
	'password': 'testertester'
}

function seedGardenData() {
	console.info('seeding garden data');
	const seedData = [];

	for (let i=1; i<10; i++) {
		seedData.push(generateGardenData());
	}
	return Garden.insertMany(seedData);
}

// used to generate a username to put in db
function generateTestUser() {
	console.log('creating test user');
	const testUser = garden.createOne();
	return User.create(testUser);
}

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

describe('/POST Register', () => {
	it('should Register, Login, and check token', (done) => {
		chai.request(server)
			.post('/')
			.send(registerDetails)
			.end((err, res) => {
				res.should.have.status(201);
				expect(res.body.state).to.be.true;

				// login
				chai.request(server)
			})
	})
})

describe('Garden API resourse', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});
	beforeEach(function() {
		return seedGardenData();
	});
	afterEach(function() {
		return tearDownDb();
	});
	after(function() {
		return closeServer();
	});

	// describe('GET endpoint', function() {
	// 	it('should return all existing plants', function() {
	// 		let res;
	// 		return chai.request(app)
	// 			.get('/garden')
	// 			.then(function(_res) {
	// 				res = _res;
	// 				res.should.have.status(200);
	// 				res.body.garden.should.have.length.of.at.least(1);
	// 				return Garden.count();
	// 			})
	// 			.then(function(count) {
	// 				res.body.garden.should.have.length.of(count);
	// 			});
	// 	});
	// })

})

// router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
// 	// make call to database first
// 	// get response - if not response, send back 500.  if
// 	Garden
// 		.find()
// 		.exec()
// 		.then(plants => {
// 			res.status(200).json(plants)
// 		})
// 		.catch(err => {
// 			res.status(500).json({message: 'Internal server error'});
// 		})
// });

// describe('Garden Planner', function() {
// 	before(function() {
// 		return runServer();
// 	});

// 	after(function() {
// 		return closeServer();
// 	});

// 	it('should return response 200 and html', function() {
// 		return chai.request(app)
// 			.get('/')
// 			.then(function(res) {
// 				res.should.have.status(200);
// 				res.should.be.html;
// 			});
// 	})
// })
