'use strict';

/* parse the full-cash-back-promotion file data*/

var Format = require('../../utils/format');
var FullCashBackPromotion = require('../promotion/full-cash-back-promotion');

module.exports = {
    parse: function(line) {
        if(!line) return undefined;
        var splitResult = line.split(':'); // parse the line as barcode : fullCash : backCash
        if(splitResult.length != 3) return undefined;
        var fullCashBackPromotion = new FullCashBackPromotion(Format.toFloat(splitResult[1]), Format.toFloat(splitResult[2]));
        return {
            barcode: splitResult[0],
            promotion: fullCashBackPromotion
        }

    }
};