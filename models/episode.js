const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    episode_title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    episode_number: {
        type: Number,
        default: 1
    },
    main_story: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vote: {
        type: Number,
        default: 0
    },
    voter: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, { timestamps: true });

module.exports = mongoose.model('Episode', episodeSchema);