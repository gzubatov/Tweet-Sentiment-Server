var Sentiment = require('sentiment');
var sentiment = new Sentiment();

// This alters and/or adds in additional sentiment scores
const options = {
	extras : {
		disservice : -1,
		fav        : 1,
		grinch     : -1,
		honorable  : 1,
		lead       : 1,
		lies       : -2,
		ruin       : -2,
		score      : 1,
		smug       : -2
	}
};

// This function parses the text and returns a sentiment score object
const getSentimentScore = (text) => {
	return sentiment.analyze(text, options);
};

module.exports = getSentimentScore;
