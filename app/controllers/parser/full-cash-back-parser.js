'use strict';

/* parse the full-cash-back-promotion file data*/

var format = require('../../utils/format');
var fullCashBackPromotion = require('../promotion/full-cash-back-promotion');
var instance = require('../../utils/instance');

module.exports = {
    parse: function(line) {
        if(!line) return undefined;
        var splitResult = line.split(':'); // parse the line as barcode : fullCash : backCash
        if(splitResult.length != 3) return undefined;
        var fullCash = format.toFloat(splitResult[1]);
        var cashBack = format.toFloat(splitResult[2]);
        var newFullCashBackPromotion = instance.clone(fullCashBackPromotion);
        newFullCashBackPromotion.setFullCashBack(fullCash, cashBack);
        return {
            barcode: splitResult[0],
            promotion: newFullCashBackPromotion
        }

    }
};