'use strict';

var fs = require('fs');

module.exports = {
    read: function (filePath) {
        return fs.readFileSync(filePath, 'utf-8');

        //fs.readFile('resources/cart.txt', 'utf-8', function(error, data) {
        //    if(error) {
        //        response.send(error);
        //    } else {
        //        response.send(data);
        //    }
        //});
    }

};
