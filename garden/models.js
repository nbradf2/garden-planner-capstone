const mongoose = require('mongoose');

const gardenSchema = mongoose.Schema({
	user: {type: String, required: true},
	name: {type: String, required: true},
	startDate: {type: String, required: true},
	harvestDate: {type: String},
	comments: {type: String}
})

const Garden = mongoose.model('Garden', gardenSchema)

module.exports = {Garden};