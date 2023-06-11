const User = require('../models/users');
const Episode = require('../models/episode');

const isVoted = async (req, res, next) => {
    const user = await User.findById(req.userAuth);
    const episodes = await Episode.find();
    const epi = await Episode.findById(req.params.episodeId);
    const episodeNumber = epi.episode_number;
    const episode = episodes.filter(episode => episode.episode_number === episodeNumber);
    const votedUser = episode.filter(episode => episode.voter.toString() === user._id.toString());
    if(votedUser){
        const err = new Error('already voted!');
        next(err);
    }
    next();
}

module.exports = isVoted;