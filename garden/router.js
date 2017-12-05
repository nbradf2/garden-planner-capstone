// blog-api-mongoose
// where it says 'post', return 'plants'
// app.get('/blog-posts', (req, res) => {})
// 500s are internal/database errors
// 400s are network errors

const express = require('express');

const config = require('../config');

const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Garden} = require('./models');

// 1. what's the route? (Garden)
// 2. Does request have a header auth prop set to bearer xxx - if not, will stop with 401 
// 3. If has header auth prop, will respond with 200

// will need to put this middleware line on ALL of the get/put/post/delete - all internal routes need authentication EXCEPT register/new-user
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	// make call to database first
	// get response - if not response, send back 500.  if
	Garden
		.find()
		.exec()
		.then(plants => {
			res.status(200).json(plants)
		})
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		})
});

router.get('/:id', (req, res) => {
	Garden
		.findById(req.params.id)
		.exec()
		.then(plant => res.status(200))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'})
		})

})

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['name', 'startDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = Garden.create(req.body.name, req.body.start-date);
	res.status(201).json(item);
});

router.put('/:id', (req, res) => {
	const requiredFields = ['name', 'startDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
		console.error(message);
		return res.status(400).send(message);
		
	}
	console.log(`Updating garden item ${req.params.id}`);
	Garden
		.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
		.exec()
		.then(plant => res.status(200).json(plant))
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		});
});

router.delete('/:id', (req, res) => {
	Garden
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(() => res.status(204).end())
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		})
});

// catch-all for routes that are not named
router.use('*', (req, res) => {
	res.status(404).send('URL Not Found');
});


//************************************

module.exports = {router};

// should provide 'proof of work' when making changes so you can test them on the results
// unit tests: delete by id, ifnd by id, should return error 