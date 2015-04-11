'use strict';

/* parse the discount-promotion file data */

var format = require('../../utils/format');
var DiscountPromotion = require('../promotion/discount-promotion');
var instance = require('../../utils/instance');

function DiscountParser() {
}

DiscountParser.prototype.parse = function(line) {
    if(line === undefined) return undefined;
    var splitResult = line.split(':'); // parse the line as barcode : discount
    if(splitResult.length != 2) return undefined;
    var discountRate = format.toFloat(splitResult[1]);
    if(discountRate === undefined) return undefined;
    var discountPromotion = new DiscountPromotion(discountRate/100);
    return {
        barcode: splitResult[0],
        promotion: discountPromotion
    }
};

module.exports = DiscountParser;