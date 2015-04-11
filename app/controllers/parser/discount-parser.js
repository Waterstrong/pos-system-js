'use strict';

/* parse the discount-promotion file data */

var Format = require('../../utils/format');
var DiscountPromotion = require('../promotion/discount-promotion');

function DiscountParser() {
}

DiscountParser.prototype.parse = function(line) {
    if(line === undefined) return undefined;
    var splitResult = line.split(':'); // parse the line as barcode : discount
    if(splitResult.length != 2) return undefined;
    var discountRate = Format.toFloat(splitResult[1]);
    if(discountRate === undefined) return undefined;
    var discountPromotion = new DiscountPromotion(discountRate/100);
    return {
        barcode: splitResult[0],
        promotion: discountPromotion
    }
};

module.exports = DiscountParser;