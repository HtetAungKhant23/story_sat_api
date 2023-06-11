const express = require('express');
const router = express.Router();
const controllers = require('../controllers/episode');
const isAuth = require('../middlewares/isAuth');

router.post('/create/:main_story', isAuth, controllers.create_episode);

module.exports = router;