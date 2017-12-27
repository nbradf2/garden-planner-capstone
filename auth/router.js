const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('../config');

const createAuthToken = user => {
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const router = express.Router();
router.use(bodyParser.json());

router.post(
	'/login',
	passport.authenticate('local', {session: false}),
	(req, res) => {
		const authToken = createAuthToken(req.user.apiRepr());
		res.json({authToken})
	}
);

router.post(
	'/refresh',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const authToken = createAuthToken(req.user);
		res.json({authToken});
	}
);

module.exports = {router};