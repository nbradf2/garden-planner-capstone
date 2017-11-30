//serve index.html file
const express = require('express');
const morgan = require('morgan');

const app = express();

// add const for router

app.use(morgan('common'));

// 'public' - already directs to localhost 8080
app.use(express.static('public'));

// have named paths:
//	- i.e. call it garden
//	- 1st: get/garden/
//	- next get/garden/:id
// - post to same route
app.get('/', (req, res) => {
	
});

app.get('/', (req, res) => {
	
});

app.get('/', (req, res) => {
	
});

app.get('/', (req, res) => {
	
});

// app.use('/endpoint', router);

let server;

function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		server = app.listen(port, () => {
			console.log(`Your app is listening on port ${port}`);
			resolve(server);
		}).on('error', err => {
			reject(err)
		});
	});
}

function closeServer() {
	// return mongooose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			
			server.close(err => {
				if (err) {
					return reject(err);
				}
				console.log('Closing server');
				resolve();
				console.log('Really closing server');
			});
		});
	// });
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};