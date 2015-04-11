'user strict';

/* parse the shopping-cart file data */

var Format = require('../../utils/format');

module.exports = {
    parse: function(line) {
        if(!line) return undefined;
        var splitResult = line.split('-'); // parse the line as barcode : amount
        if(splitResult.length !== 1 && splitResult.length !== 2) return undefined;
        var amount = 1;
        if(splitResult.length === 2) {
            amount = Format.toInt(splitResult[1]);
        }
        if(!amount) return undefined;
        return {
            barcode: splitResult[0],
            amount: amount
        }
    }
};