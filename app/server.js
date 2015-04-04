'use strict';
var express = require('express');
var app = express();

var dataProvider = require('./controllers/data-provider');

var config = require('./config');

app.get('/', function(request, response){
    var message = "Welcome you to the " + config.SITE_NAME + ".       ——" + config.AUTHOR + "    | Now Time is " + (new Date()) ;
    console.log(message);

    var result = dataProvider.read(config.FILE_PATH.cartFile);

    console.log(result);

    response.send(message);
});

app.listen(config.PORT);
