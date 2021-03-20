// require dotenv - to import port
require('dotenv').config();

//import express, for the routes
const express = require('express');
//import body-parser, to parse the json requests
const bodyParser = require('body-parser');
//import pronote-api custom
const pronote = require('./pronote-api-custom');
//imprt cors, to enable accessing the pronote data
const cors = require('cors');

//create the app and use bodyparser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//add timetable route
app.post('/timetable', async (req, res) => {
    if (req.body.url == undefined && req.body.username == undefined && req.body.password == undefined) {
        res.status(401).json({ error: 'Specify url, username and password of your account!' });
        return;
    } else {
        const url = req.body.url;
        const username = req.body.username;
        const password = req.body.password;

        try {
            const session = await pronote.login(url, username, password);
            const timetable = await session.timetable();
            res.status(200).json({ timetable: timetable });
        } catch (err) {
            console.log(err)
            if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                res.status(501).json({ error: 'Wrong Credentials' });
            } else {
                res.status(501).json({ error: err });
            }
        }
    }
});

app.post('/homework', async (req, res) => {
    if (req.body.url == undefined && req.body.username == undefined && req.body.password == undefined) {
        res.status(401).json({ error: 'Specify url, username and password of your account!' });
        return;
    } else {
        const url = req.body.url;
        const username = req.body.username;
        const password = req.body.password;

        try {
            const session = await pronote.login(url, username, password);
            const homework = await session.homeworks();
            res.status(200).json({ homework: homework });
        } catch (err) {
            console.log(err)
            if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                res.status(501).json({ error: 'Wrong Credentials' });
            } else {
                res.status(501).json({ error: err });
            }
        }
    }
});

app.post('/contents', async (req, res) => {
    if (req.body.url == undefined && req.body.username == undefined && req.body.password == undefined) {
        res.status(401).json({ error: 'Specify url, username and password of your account!' });
        return;
    } else {
        const url = req.body.url;
        const username = req.body.username;
        const password = req.body.password;

        try {
            const session = await pronote.login(url, username, password);
            const contents = await session.contents();
            res.status(200).json({ contents: contents });
        } catch (err) {
            console.log(err)
            if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                res.status(501).json({ error: 'Wrong Credentials' });
            } else {
                res.status(501).json({ error: err });
            }
        }
    }
});

//start listening on specified port
app.listen(process.env.PORT);