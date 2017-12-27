const express = require('express');
const config = require('../config');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Journal} = require('./models');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	Journal
		.find()
		.exec()
		.then(journalPosts => {
			res.status(200).json(journalPosts)
		})
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		})
});

router.get('/user/:user', passport.authenticate('jwt', {session: false}), (req, res) => {
	Journal
		.find({user: `${req.params.user}`})
		.exec()
		.then(journalPosts => {
			res.status(200).json(journalPosts)
		})
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		})
});

router.get('/:id', (req, res) => {
	Journal
		.findById(req.params.id)
		.exec()
		.then(journalPosts => res.status(200).json(journalPosts))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'})
		})
})

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['content'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = Journal.create({
		user: req.body.user,
		content: req.body.content,
		publishDate: req.body.publishDate
	});
	res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['content'];
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
	console.log(`Updating journal item ${req.params.id}`);
	Journal
		.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
		.exec()
		.then(journalPosts => res.status(200).json(journalPosts))
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		});
});

router.delete('/:id', (req, res) => {
	Journal
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(() => res.status(204).end())
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		})
});

router.use('*', (req, res) => {
	res.status(404).send('URL Not Found');
});

module.exports = {router};