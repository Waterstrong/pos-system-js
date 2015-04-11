'use strict';

/* parse the goods item-list file data */

var Format = require('../../utils/format');

module.exports = {
    parse: function(line) {
        if(!line) return undefined;
        var splitResult = line.split(':'); // parse the line as product ( barcode : price )
        if(splitResult.length != 2) return undefined;
        var price = Format.toFloat(splitResult[1]);
        if(price < 0) return undefined;
        return {
            barcode: splitResult[0],
            price: price
        }
    }
};