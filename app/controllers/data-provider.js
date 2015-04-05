'use strict';

var fs = require('fs');

module.exports = {
    read: function (filePath) {
        var data = fs.readFileSync(filePath, 'utf-8');
        return data.split('\r\n');

        //fs.readFile('resources/cart.txt', 'utf-8', function(error, data) {
        //    if(error) {
        //        response.send(error);
        //    } else {
        //        response.send(data);
        //    }
        //});
    }

};
