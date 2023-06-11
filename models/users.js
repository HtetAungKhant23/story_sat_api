const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    story: [{
        type: Schema.Types.ObjectId,
        ref: 'Story'
    }],
    episode: [{
        type: Schema.Types.ObjectId,
        ref: 'Episode'
    }]
});

module.exports = mongoose.model('User', userSchema);