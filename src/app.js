const express = require('express');

const twitterRoutes = require('../routes/twitter-routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	next();
});

app.use('/api/twitter', twitterRoutes);

module.exports = app;
