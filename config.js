exports.DATABASE_URL = 
	process.env.MONGODB_URI ||
	global.DATABASE_URL ||
	'mongodb://heroku_crv9fsf8:uevnduhv7r48t4sfgsl38mguul@ds157653.mlab.com:57653/heroku_crv9fsf8';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY;

/// on mLab - will need to create a database and set values for:
//	- JWT_SECRET
//  - DATABASE_URL
// in the .env file

//mongodb://heroku_crv9fsf8:uevnduhv7r48t4sfgsl38mguul@ds157653.mlab.com:57653/heroku_crv9fsf8
//mongodb://localhost/garden