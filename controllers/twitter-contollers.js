// Route controllers, what happens when an API route is triggered
const https = require('https');
const Twitter = require('twitter');
const getSentiment = require('../utils/sentiment');

var client = new Twitter({
	consumer_key    : process.env.CONSUMER_KEY,
	consumer_secret : process.env.CONSUMER_SECRET,
	bearer_token    : process.env.BEARER_TOKEN
});

// This function uses the Twitter API to fetch tweets based on search terms
const searchTweets = async (req, res, next) => {
	const query = req.params.query;
	const geolocation = req.params.geolocation;

	// Parameters for the Twitter API query
	const params = {
		q           : query,
		result_type : 'recent',
		exclude     : 'retweets'
	};

	if (geolocation !== 'none') {
		params.geocode = geolocation;
	}

	try {
		const data = await client.get('/search/tweets.json', params);
		const results = [];
		data.statuses.forEach((status) => {
			const score = getSentiment(status.text);
			results.push({ status, score });
		});
		res.json({ data, results });
	} catch (error) {
		res.status(500).send(error);
	}
};

// Fetches the Twitter oEmbed HTML
const getTweet = async (req, res, next) => {
	const tweetID = req.params.id;
	const username = req.params.username;
	const url = `https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F${username}%2Fstatus%2F${tweetID}&omit_script=true`;
	https.get(url, (response) => {
		let data = '';

		//another chunk of data has been received, so append it to `data`
		response.on('data', function(chunk) {
			data += chunk;
		});

		//the whole response has been received, so we send our response
		response.on('end', function() {
			console.log(JSON.parse(data));
			const embedData = JSON.parse(data);
			res.json(embedData);
		});
	});
};

module.exports = {
	searchTweets,
	getTweet
};
