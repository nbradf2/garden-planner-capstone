const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
	user: {type: String, required: true},
	content: {type: String, required: true},
	publishDate: {type: String, required: true}
})

const Journal = mongoose.model('Journal', journalSchema)

module.exports = {Journal};