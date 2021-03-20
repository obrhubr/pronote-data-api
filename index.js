// require dotenv - to import port
require('dotenv').config();

//import express, for the routes
const express = require('express');
//import body-parser, to parse the json requests
const bodyParser = require('body-parser');
//import pronote-api custom
const pronote = require('./pronote-api-custom');

//create the app and use bodyparser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());