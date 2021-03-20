# Pronote-data-api

### Description
This api aims to provide a simple, hosted interface for the end user to hook into. It is not something that the user should interact directly, you should only use this to source the data that is provided as a starting point and display and modify it in creative ways.

## Table of Content

- [**Getting Started**](#getting-started)
- [API](#API)
- [Contributing](#contributing)
- [Built With](#built-with)
- [Acknowledgments](#acknowledgements)

## Getting Started

Simply use the api from the heroku-hosted server at [pronote-data-api.herokuapp.com](https://pronote-data-api.herokuapp.com), or:
 - install the dependencies using `npm install`
 - start the app using `npm start`

## API

Make a POST request to any of these endpoints to get the respective data in json format:
 - `/homework`
 - `/timetable`
 - `/contents`

Always provide the following data in json format: 
 - `url` : the url of the school, for the LFV this would be [https://pronote.lyceefrancais.at/eleve.html](https://pronote.lyceefrancais.at/eleve.html)
 - `username` : the username
 - `password` : the password corresponding to the username

The data is always for the current day, so this is perfect for third party pronote UI's.

## Contributing

Feature requests are always welcome, pull request too.

## Built With

This project was built using NodeJS and [Litarvan](https://github.com/litarvan/pronote-api)'s great api.

## Acknowledgements

I used NodeJS and [Litarvan](https://github.com/litarvan/pronote-api)'s great api for pronote for this project.