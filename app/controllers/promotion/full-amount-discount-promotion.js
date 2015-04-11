'use strict';

/* when reach the amount then make discount promotion */

var instance = require('../../utils/instance');

var format = require('../../utils/format');

function FullAmountDiscountPromotion(fullAmount, discountRate){
    this.fullAmount = fullAmount;
    this.discountRate = discountRate;
}

FullAmountDiscountPromotion.prototype.getFullAmount = function() {
    return this.fullAmount;
};

FullAmountDiscountPromotion.prototype.getDiscountRate = function() {
    return this.discountRate;
};

FullAmountDiscountPromotion.prototype.calculate = function(item) {
    if(!item || this.fullAmount <= 0 || this.discountRate < 0 || this.discountRate > 1) {
        throw new Error('full-amount-discount-promotion: item is undefined or fullAmount|discountRate is illegal.');
        //return undefined;
    }
    var discountAmount = format.toInt(item.amount / this.fullAmount);
    var subtotal = item.price * this.discountRate * discountAmount + (item.amount - discountAmount) * item.price;
    var newItem = instance.clone(item);
    newItem.price = subtotal / item.amount;
    return newItem;
};

module.exports = FullAmountDiscountPromotion;