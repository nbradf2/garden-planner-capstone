// allow users to provide credentials in order to access endpoints
// using passport.js to set up a local authentication strategy:
// - retrieve UN and pass from request's Auth header
// - check if they are valid
// - use the strategy to protect the /api/auth/login endpoint

const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {
	// assignes Strategy export to name JwtStrategy using object destructuring:
	Strategy: JwtStrategy,
	ExtractJwt
} = require('passport-jwt');

const {User} = require('../users/models');
const {JWT_SECRET} = require('../config');

// LOCAL authentication strategy (to use, register in server.js):
const localStrategy = new LocalStrategy((username, password, callback) => {
	let user;
	// look for a user with the supplied username:
	User.findOne({username: username})
		.then(_user => {
			user = _user;
			if(!user) {
				// return rejected promise to break out of chain of .thens
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incorrect username or password'
				});
			}
			// If the user is found, we then call the validate Password method
			return user.validatePassword(password);
		})
		.then(isValid => {
			if(!isValid) {
				return Promise.reject({
					reason: 'LoginError', 
					message: 'Incorrect username or password'
				});
			}
			return callback(null, user);
		})
		.catch(err => {
			if (err.reason === 'LoginError') {
				return callback(null, false, err);
			}
			return callback(err, false);
		});
});

// After user has their JWT, it needs to access an endpoint:
const jwtStrategy = new JwtStrategy(
	{
		// pass the same secret key that was used to sign the tokens
		// specifying that we will only allow tokens signed with HS256:
		secretOrKey: JWT_SECRET,
		// look for JWT as a Bearer auth header:
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		// only allow HS256 tokens - the same as the ones we issue:
		algorithms: ['HS256']
	},
	// if a valid JWT is supplied, this callback will be run indicating
	// we have authenticated successfully:
	(payload, done) => {
		done(null, payload.user);

		// to register this JWT strategy with Passport, use the passport.use method in server.js
	}
);

module.exports = {localStrategy, jwtStrategy};