const Story = require('../models/story');
const Episode = require('../models/episode');

exports.createStory = async (req, res, next) => {
    try {
        const {
            storyTitle,
            episodeTitle,
            episodeContent
        } = req.body;

        const creatorId = req.userAuth;

        const createEpisode = new Episode({
            episode_title: episodeTitle,
            content: episodeContent,
            creator: creatorId
        });

        const createStory = new Story({
            story_title: storyTitle,
            creator: creatorId
        });

        const episode = await createEpisode.save();
        const story = await createStory.save();
        episode.main_story = story._id;
        story.episodes.push(episode._id);
        story.win_episode.push(episode._id);
        await story.save();
        await episode.save();

        res.status(201).json({
            message: "story is successfully created!",
            story: story,
            episode: episode
        })

    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
}