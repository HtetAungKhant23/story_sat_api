const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Url = process.env.MONGODB_URL;

const connet = () => {
    try{
        mongoose.connect(Url, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('DB connected!');
    }catch(error){
        console.log('DB error');
    }
}

module.exports = connet;