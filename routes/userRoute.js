const express = require('express');
const router  = express.Router();
const shorturlController = require('../controllers/shorturlController');
const redirectUrl = require('../controllers/redirectController');

router.post('/' ,shorturlController )

router.get('/:shortcode' ,redirectUrl )

module.exports = router;