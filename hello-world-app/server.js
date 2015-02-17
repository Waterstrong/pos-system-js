'use strict';
var express = require('express');
var app = express(); 

app.get('/', function(req, res){ 
	res.send('Hello World, Waterstrong!'); 
});


app.listen(3000);
