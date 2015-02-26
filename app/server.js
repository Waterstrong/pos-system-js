'use strict';
var express = require('express');
var app = express();

var fs = require('fs');
app.get('/', function(request, response){
    //var data = fs.readFileSync('resources/cart.txt', 'utf-8');
    //response.send(data);
    //response.send('Welcome to the Pos System.');

    fs.readFile('resources/cart.txt', 'utf-8', function(error, data) {
        if(error) {
            response.send(error);
        } else {
            response.send(data);
        }
    });

});

app.listen(3000);
