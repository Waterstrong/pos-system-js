'use strict';
var express = require('express');
var app = express();

var posSystem = require('./controllers/market/pos-system');

var config = require('./config');

var copyright = "=========== Welcome to the " + config.SITE_NAME + " ===========\n\r© Copyright 2015-2016 —— " +
    config.AUTHOR + "   "+ config.EMAIL +"\n\rNow Time: " + (new Date()) +"\n\r";

console.log(copyright);

app.get('/', function(request, response){

    var result = posSystem.run(config);

    //console.log(result);

    response.send(copyright + "\n\r");
});

app.listen(config.PORT);
