const http = require('http');
const Twitter = require('twitter');
const getSentiment = require('../utils/sentiment');

var client = new Twitter({
	consumer_key    : process.env.CONSUMER_KEY,
	consumer_secret : process.env.CONSUMER_SECRET,
	bearer_token    : process.env.BEARER_TOKEN
});

const searchTweets = async (req, res, next) => {
	const query = req.params.query;
	const geolocation = req.params.geolocation;
	console.log(query, geolocation);
	const params = {
		q           : query,
		//geocode     : geolocation,
		result_type : 'recent',
		exclude     : 'retweets'
	};

	if (geolocation !== 'none') {
		params.geocode = geolocation;
	}

	console.log(params);

	try {
		const data = await client.get('/search/tweets.json', params);
		const results = [];
		//console.log(data);
		data.statuses.forEach((status) => {
			const score = getSentiment(status.text);
			results.push({ status, score });
		});
		res.json({ data, results });
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	searchTweets
};
