const express = require('express');

const config = require('../config');

const router = express.Router();
const passport = require('passport');

// protects the /api/auth/login endpoint
router.get(
	// can only get to this route if we're logged in
	'/',
	// user provides UN and pass to login using basic auth strategy in the route:
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		// this createAuthToken function is used in the /api/auth/login route:
		// will replace with Mongoose database call with Garden.find()
		res.send('hello')
	}
);

// final part fo rlogin is to allow users to refresh their token:
router.post(
	'/',
	// the user exchanges an existing valid JWT for a new one with a later expiration
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		// will do a Garden.create
		res.send('hello');
	}
);

module.exports = {router};