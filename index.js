const express = require('express');
const cors = require('cors');
const createErrors = require('http-errors');
const utils = require('./utils');

// constants
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));


/*
0 - grey
1 - green
2 - yellow
*/

// getARandomWord(data, 2499);
// guessNextWord("trash", [0, 0, 0, 0, 0]);
// guessNextWord("lucky", [2, 2, 2, 0, 0]);
// guessNextWord("cloud", [1, 2, 2, 2, 1]);

// routes
app.get('/', (req, res) => {
    res.send('Hello world');
});

// get a random world
app.get('/getARandomWorld', (req, res, next) => {
    try {
        data = utils.readAllWords();
        randomWord = utils.getARandomWord(data, 2499);

        res.send({
            randomWord
        });
    } catch (err) {
        next(err)
    }
});

// guess next word
app.get('/guessNextWord', (req, res, next) => {
    try {

        curentWord = req.body.currentWord;
        wordStatus = req.body.wordStatus;

        nextWord = utils.guessNextWord(curentWord, wordStatus);

        res.send({
            nextWord
        });
    } catch (err) {
        next(err)
    }
})

// handle wildcard route
app.use(async(req, res, next) => {
    next(createErrors.NotFound('This route does not exists!'));
});

// handle errors
app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        err.status = 400;
    }
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal server error'
        }
    });
});

// start the server
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}...`);
});