'use strict';

/* parse the second-half-price file data */

var FullAmountDiscountPromotion = require('../promotion/full-amount-discount-promotion');

module.exports = {
    parse: function(line) {
        if (!line) return undefined;
        var fullAmountDiscountPromotion = new FullAmountDiscountPromotion(2, 0.5);
        return {
            barcode: line,
            promotion: fullAmountDiscountPromotion
        };
    }
};