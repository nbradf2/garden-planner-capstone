const mongoose = require('mongoose');

// schema to represent a garden entry:
const gardenSchema = mongoose.Schema({
	name: {type: String, required: true},
	'start-date': {type: Date, required: true},
	'harvest-date': {type: Date},
	comments: {type: String}
})

gardenSchema.methods.apiRepr = function () {
	return {
		id: this._id,
		name: this.name,
		'start-date': this.start-date,
		'harvest-date': this.harvest-date,
		comments: this.comments
	}
}

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = {Garden};





