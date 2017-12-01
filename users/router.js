const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {User} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// POST to register a new user
router.post('/', jsonParser, (req, res) => {
	// Ensure that the username and password are defined
	const requiredFields = ['username', 'password'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		});
	}

	// Check to make sure all of the fields are strings:
	const stringFields = ['username', 'password', 'firstName', 'lastName'];
	const nonStringField = stringFields.find(
		field => field in req.body && typeof req.body[field] !== 'string'
	);

	if (nonStringField) {
		return res.status(422).json({
			code: 422, 
			reason: 'ValidationError',
			message: 'Incorrect field type: expected string',
			location: nonStringField
		});
	}

	// reject values with aren't trimmed
	const explicitlyTrimmedFields = ['username', 'password'];
	const nonTrimmedField = explicitlyTrimmedFields.find(
		field => req.body[field].trim() !== req.body[field]
	);

	if (nonTrimmedField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Cannot start or end with space',
			location: nonTrimmedField
		});
	}

	// Check to make sure UN and pass are correct length
	const sizedFields = {
		username: {
			min: 1
		},
		password: {
			min: 10,
			max: 72
		}
	};
	const tooSmallField = Object.keys(sizedFields).find(
		field =>
			'min' in sizedFields[field] &&
			req.body[field].trim().length < sizedFields[field].min 
	);
	const tooLargeField = Object.keys(sizedFields).find(
		field =>
			'max' in sizedFields[field] &&
			req.body[field].trim().length > sizedFields[field].max
	);

	if (tooSmallField || tooLargeField) {
		return res.status(422).json({
			// if any of the checks fail, we return a JSON error object below:
			code: 422,
			reason: 'ValidationError',
			message: tooSmallField
				? `Must be at least ${sizedFields[tooSmallField].min} characters long`
				: `Must be at most ${sizedFields[tooLargeField].max} characters long`,
			location: tooSmallField || tooLargeField
		});
	}

	let {username, password, firstName = '', lastName = ''} = req.body;
	// UN and pass come in pre-trimmed, otherwise throw error:
	firstName = firstName.trim();
	lastName = lastName.trim();

	// because UNs are unique in our system, check to see if existing user with requested name:
	return User.find({username})
		.count()
		.then(count => {
			if (count > 0) {
				return Promise.reject({
					code: 422,
					reason: 'ValidationError',
					message: 'Username is already taken',
					location: 'username'
				});
			}
			// if no exisiting user, hash password:
			return User.hashPassword(password);
		})	

		// Once we have our hash, save a new user, setting the PASSWORD to hash value
		.then(hash => {
			return User.create({
				username,
				password: hash,
				firstName,
				lastName
			});
		})
		.then(user => {
			return res.status(201).json(user.apiRepr());
		})
		.catch(err => {
			if (err.reason === 'ValidationError') {
				return res.status(err.code).json(err);
			}
			res.status(500).json({code: 500, messaage: 'Internal server error'});
		});
});

// Never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
    return User.find()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};