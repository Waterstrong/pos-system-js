'use strict';
var express = require('express');
var app = express();

var dataProvider = require('./controllers/data-provider');
var dataParser = require('./controllers/data-parser');
var cartParser = require('./controllers/shopping-cart-parser');

var config = require('./config');

app.get('/', function(request, response){
    var message = "Welcome you to the " + config.SITE_NAME + ".\n\r       ——" + config.AUTHOR + "    | Now Time is " + (new Date()) +"\n\r";
    console.log(message);

    var result = dataProvider.read(config.FILE_PATH.cartFile);

    var dataList = dataParser.map(result, cartParser);
    console.log(dataList);


    //console.log(result);

    response.send(message);
});

app.listen(config.PORT);
