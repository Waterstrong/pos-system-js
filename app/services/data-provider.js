'use strict';

/* provide data from file stream */

var fs = require('fs');

module.exports = {
    read: function (filePath) {
        var data = fs.readFileSync(filePath, 'utf-8');
        return data.split('\r\n');

        // TODO: handle exception. if not sync mode, how to provider data

        //fs.readFile(filePath, 'utf-8', function(error, data) {
        //    if(error) {
        //        console.log(error);
        //        return undefined;
        //    } else {
        //        console.log(data);
        //        return data.split('\r\n');
        //    }
        //});
    }

};
