'use strict';

/* make xxx discount promotion */

var Instance = require('../../utils/instance');


function DiscountPromotion(discountRate) {
    this.discountRate = discountRate;
}

DiscountPromotion.prototype.getDiscountRate = function() {
    return this.discountRate;
};

DiscountPromotion.prototype.calculate = function(item) {
    var self = this;
    if(item == undefined || self.discountRate == undefined || self.discountRate < 0 || self.discountRate > 1) {
        throw new Error("discount-promotion: item is undefined or rate is illegal.");
    }
    var newItem = Instance.clone(item); // TODO: how to solve the ref
    newItem.price = item.price * self.discountRate;
    return newItem;
};

module.exports = DiscountPromotion;