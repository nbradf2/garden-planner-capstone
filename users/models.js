const bcrypt = require('bcrypt.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {type: String, default: ''},
	lastName: {type: String, default: ''}
});

UserSchema.methods.apiRepr = function() {
	return {
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || ''
	};
};

// Validate password function:
// 	- use BCRYPT to compare plain text value with the hashed value stored on this.password
UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

// Using the BCRYPTJS library to handle encrypting user passwords.
// call the bcrypt HASH method with the raw password and an integer value
// indicating how many rounds of the salting algorithm hsould be used.
UserSchema.statistics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};