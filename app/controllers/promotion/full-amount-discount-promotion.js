'use strict';

/* when reach the amount then make discount promotion */

var Instance = require('../../utils/instance');

var Format = require('../../utils/format');

function FullAmountDiscountPromotion(fullAmount, discountRate){
    this.fullAmount = fullAmount;
    this.discountRate = discountRate;
}

FullAmountDiscountPromotion.prototype.calculate = function(item) {
    var self = this;
    if(item === undefined || self.fullAmount === undefined || self.fullAmount <= 0 ||
        self.discountRate === undefined || self.discountRate < 0 || self.discountRate > 1) {
        throw new Error('full-amount-discount-promotion: item is undefined or fullAmount|discountRate is illegal.');
        //return undefined;
    }
    var discountAmount = Format.toInt(item.amount / self.fullAmount);
    var subtotal = item.price * self.discountRate * discountAmount + (item.amount - discountAmount) * item.price;
    var newItem = Instance.clone(item);
    newItem.price = subtotal / item.amount;
    return newItem;
};

module.exports = FullAmountDiscountPromotion;