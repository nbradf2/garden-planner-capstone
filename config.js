exports.DATABASE_URL = 
	process.env.DATABASE_URL ||
	global.DATABASE_URL ||
	'mongodb://localhost/garden';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY;

/// on mLab - will need to create a database and set values for:
//	- JWT_SECRET
//  - DATABASE_URL
// in the .env file