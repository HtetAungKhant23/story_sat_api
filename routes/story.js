const express = require('express');
const controllers = require('../controllers/story');
const isAdmin = require('../middlewares/isAdmin');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

// create story => localhost:5000/story/create/12345
router.post('/create', isAuth, isAdmin, controllers.createStory);

module.exports = router;