var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening to port number " + port);
