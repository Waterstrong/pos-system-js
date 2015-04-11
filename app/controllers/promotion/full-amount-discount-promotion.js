'use strict';

/* when reach the amount then make discount promotion */

var Instance = require('../../utils/instance');

var Format = require('../../utils/format');

function FullAmountDiscountPromotion(fullAmount, discountRate){
    this.fullAmount = fullAmount;
    this.discountRate = discountRate;
}

FullAmountDiscountPromotion.prototype.calculate = function(item) {
    if(item === undefined || this.fullAmount === undefined || this.fullAmount <= 0 ||
        this.discountRate === undefined || this.discountRate < 0 || this.discountRate > 1) {
        throw new Error('full-amount-discount-promotion: item is undefined or fullAmount|discountRate is illegal.');
        //return undefined;
    }
    var discountAmount = Format.toInt(item.amount / this.fullAmount);
    var subtotal = item.price * this.discountRate * discountAmount + (item.amount - discountAmount) * item.price;
    var newItem = Instance.clone(item);
    newItem.price = subtotal / item.amount;
    return newItem;
};

module.exports = FullAmountDiscountPromotion;