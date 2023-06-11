const User = require('../models/users');
const Episode = require('../models/episode');
const Story = require('../models/story');
const generateToken = require('../utils/generateToken');

exports.getAllUser = async (req, res, next) => {
    try{
        const users = await User.find();
        if(!users){
            const err = new Error('there are no users!');
            err.statusCode = 404;
            throw err;
        }

        res.status(200).json({
            message: 'success!',
            users: users
        });

    }catch(err){
        next(err);
    }
}

exports.signup = async (req, res, next) => {
    try {
        const {
            email,
            password,
            name
        } = req.body;

        const user = new User({
            email: email,
            password: password,
            name: name
        });

        const account = await user.save();

        if (!account) {
            const err = new Error('account cannot create!');
            throw err;
        }

        res.status(201).json(account);

    } catch (err) {
        next(err);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            const err = new Error('user not found');
            err.statusCode = 422;
            throw err;
        }

        if (user.password !== password) {
            const err = new Error('password is not match!');
            err.statusCode = 422;
            throw err;
        }

        res.status(200).json({
            message: 'login success!',
            user: user,
            token: generateToken(user._id)
        });

    } catch (err) {
        next(err);
    }
}

exports.vote_episode = async (req, res, next) => {
    try {
        const episodeId = req.params.episodeId;
        const episode = await Episode.findById(episodeId);
        const userId = req.userAuth;

        episode.vote += 1;
        episode.voter.push(userId);
        await episode.save();

        res.status(200).json({
            message: 'voting process success!',
            episode: episode
        });

    } catch (err) {
        next(err);
    }
}

exports.updateEpisode = async (req, res, next) => {
    try{
        const user = await User.findById(req.userAuth);
        const episode = await Episode.findById(req.params.episodeId);
        if(!episode){
            const err = new Error('episode not found!');
            throw err;
        }

        const {
            content
        } = req.body;

        episode.content = content;
        await episode.save();   
        res.status(200).json({
            message: 'updating success!',
            user: user
        });

    }catch(err){
        next(err);
    }
}

exports.deleteEpisode = async (req, res, next) => {
    try{
        const user = await User.findById(req.userAuth);
        const episodes = await Episode.find();
        const episode = await Episode.findById(req.params.episodeId);
        const mainStory = await Story.findById(episode.main_story);
        user.episode = user.episode.filter(episode => episode._id.toString() !== episode._id.toString());       
        episodes = episodes.filter(episode => episode._id.toString() !== episode._id.toString());
        mainStory.episodes = mainStory.episodes.filter(episode => episode._id.toString() !== episode._id.toString());
        await user.save();
        await episodes.save();
        await mainStory.save();
        
        res.status(200).json({
            message: 'deleted episode!',
            user: user
        })

    }catch(err){
        next(err);
    }
}