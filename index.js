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
//import error-handling function
const errorHandler = require('./lib/error');

//create the app and use bodyparser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//add timetable route
app.post('/timetable', async (req, res) => {
    if (req.body.url == undefined || req.body.username == undefined || req.body.password == undefined) {
        errorHandler.dataMissing(req, res);
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
            errorHandler.wrongCredentials(req, res, err)
        }
    }
});

app.post('/homework', async (req, res) => {
    if (req.body.url == undefined || req.body.username == undefined || req.body.password == undefined) {
        errorHandler.dataMissing(req, res);
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
            errorHandler.wrongCredentials(req, res, err)
        }
    }
});

app.post('/contents', async (req, res) => {
    if (req.body.url == undefined || req.body.username == undefined || req.body.password == undefined) {
        errorHandler.dataMissing(req, res);
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
            errorHandler.wrongCredentials(req, res, err)
        }
    }
});

//start listening on specified port
var server = app.listen(process.env.PORT || 3000);
module.exports = {
    server: server,
    app: app
}