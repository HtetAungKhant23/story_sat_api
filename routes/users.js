const express = require('express');
const controllers = require('../controllers/users');
const isAuth = require('../middlewares/isAuth');
const isVoted = require('../middlewares/isVoted');
const router = express.Router();

// signup => localhost:5000/user/signup
router.post('/signup', controllers.signup);

router.get('/users', controllers.getAllUser);

// signin => localhost:5000/user/signin
router.post('/signin', controllers.signin);

// vote => localhost:5000/user/voteEpisode
router.post('/vote/:episodeId', isAuth, isVoted, controllers.vote_episode);

// update => localhost:5000/user/updateEpisode/12345
router.put('/updateEpisode/:episodeId', isAuth, controllers.updateEpisode);

// delete => localhost:5000/user/deleteEpisode/12345
router.delete('/deleteEpisode/:episodeId', isAuth, controllers.deleteEpisode);

module.exports = router;

/* 

    validation မှာ episode အားလုံးကို find နဲ့ ခေါ်ထုတ်ထားမယ်
    ပီးရင် ဝင်လာတဲ့ userId နဲ့ episode တွေထဲက voter တွေနဲ့ id ချင်းတိုက်စစ်မယ်
    တခုတွေ့တာနဲ့ validation failed ဖြစ်သွားမယ်   
    
*/