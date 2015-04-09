'use strict';

/* parse the second-half-price file data */

var fullAmountDiscountPromotion = require('../promotion/full-amount-discount-promotion');
var instance = require('../../utils/instance');
module.exports = {
    parse: function(line) {
        if (!line) return undefined;
        var newPromotion = instance.clone(fullAmountDiscountPromotion);
        newPromotion.setAmountDiscount(2, 0.5);
        return {
            barcode: line,
            promotion: newPromotion
        };
    }
};