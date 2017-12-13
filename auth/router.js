const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const config = require('../config');

// create our JWTs w/info about user in the payload:
const createAuthToken = user => {
	// use jwt.sign to create a JWT
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const router = express.Router();
router.use(bodyParser.json());


// protects the /api/auth/login endpoint
router.post(
	'/login',
	// user provides UN and pass to login using local auth strategy in the route:
	passport.authenticate('local', {session: false}),
	(req, res) => {
		// this createAuthToken function is used in the /api/auth/login route:
		const authToken = createAuthToken(req.user.apiRepr());
		res.json({authToken})
	}
);

// final part fo rlogin is to allow users to refresh their token:
router.post(
	'/refresh',
	// the user exchanges an existing valid JWT for a new one with a later expiration
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const authToken = createAuthToken(req.user);
		res.json({authToken});
	}
);

module.exports = {router};