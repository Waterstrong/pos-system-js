'use strict';

/* when reach the amount then make discount promotion */

var instance = require('../../utils/instance');

var format = require('../../utils/format');

// how to solve class private variable problem ???

//var self = {
//    fullAmount: 0,
//    discountRate: 0
//};

module.exports = {
    fullAmount: 0,
    discountRate: 0,
    setAmountDiscount: function(fullAmount, discountRate) {
        this.fullAmount = fullAmount;
        this.discountRate = discountRate;
    },
    calculate: function(item) {
        if(!item || this.fullAmount <= 0 || this.discountRate < 0 || this.discountRate > 1) {
            console.log("full-amount-discount-promotion: item is undefined or fullAmount|discountRate is illegal.");
            return undefined;
        }
        var discountAmount = format.positiveInt(item.amount / this.fullAmount);
        var subtotal = item.price * this.discountRate * discountAmount + (item.amount - discountAmount) * item.price;
        var newItem = instance.clone(item);
        newItem.price = subtotal / item.amount;
        return newItem;
    }
};