'use strict';

/* make xxx discount promotion */

var instance = require('../../utils/instance');


function DiscountPromotion(discountRate) {
    this.discountRate = discountRate;
}

DiscountPromotion.prototype.setDiscountRate = function(discountRate) {
    this.discountRate = discountRate;
};

DiscountPromotion.prototype.getDiscountRate = function() {
    return this.discountRate;
};

DiscountPromotion.prototype.calculate = function(item) {
    if(item == undefined || this.discountRate == undefined || this.discountRate < 0 || this.discountRate > 1) {
        throw new Error("discount-promotion: item is undefined or rate is illegal.");
    }
    var newItem = instance.clone(item); // TODO: how to solve the ref
    newItem.price = item.price * this.discountRate;
    return newItem;
};

module.exports = DiscountPromotion;