// Routes for my API that my front-end uses to communicate with the server
const express = require('express');
const twitterController = require('../controllers/twitter-contollers');

const router = new express.Router();

router.get('/search/:query/:geolocation', twitterController.searchTweets);

router.get('/tweet/:username/:id', twitterController.getTweet);

module.exports = router;
