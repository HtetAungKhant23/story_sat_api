const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    story_title: {
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    win_episode: [{
        type: Schema.Types.ObjectId,
        ref: 'Episode'
    }],
    episodes: [{
        type: Schema.Types.ObjectId,
        ref: 'Episode'
    }]

}, {timestamps: true});

module.exports = mongoose.model('Story', storySchema);