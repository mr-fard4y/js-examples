'use strict';

var express = require('express');


const PORT = process.env.PORT || 3000;
const HOST = 'localhost';


let indexHandler = function(req, res) {
    res.send("Server is running.");
};


let errorHandler = function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send('Program execution error. Please contact the developer to solve it')
};


let notImplementedHandler = function(req, res, next) {
    var err = new Error('Page not found');
    err.status = 404;
    console.log(err);
    res.status(err.status || 404).send('Method is not implemented.');
};


var app = express()
    .use(express.static(__dirname))
    .use(express.static("public"))
    .get("/", indexHandler);

app.use(errorHandler).use(notImplementedHandler);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
