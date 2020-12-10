const express = require('express');
const twitterController = require('../controllers/twitter-contollers');

const router = new express.Router();

router.get('/search/:query/:geolocation', twitterController.searchTweets);

module.exports = router;
