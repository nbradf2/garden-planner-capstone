const mongoose = require('mongoose');

// schema to represent a garden entry:
const gardenSchema = mongoose.Schema({
	user: {type: String, required: true},
	name: {type: String, required: true},
	startDate: {type: String, required: true},
	harvestDate: {type: String},
	comments: {type: String}
})

// apiRepr is used to help restructure and concatenate things for ease of use
// _variable name is internal notation - not to be manipulated directly

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = {Garden};