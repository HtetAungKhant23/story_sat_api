const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const storyRoutes = require('./routes/story');
const episodeRoutes = require('./routes/episode');
const dbConnect = require('./configs/dbConnect');
const errHandler = require('./middlewares/errHandler');
const corsHandler = require('./middlewares/corsHandler');

const app = express();
app.use(express.json());

app.use(corsHandler);

app.get('/', (req,res,next) => {
    res.status(200).json({
        "message": "hehe"
    })
})

app.use('/user', userRoutes);
app.use('/story', storyRoutes);
app.use('/episode', episodeRoutes);

app.use(errHandler);

const PORT = process.env.PORT || 6000;
dbConnect();
app.listen(PORT, () => console.log(`server run at ${PORT}`));