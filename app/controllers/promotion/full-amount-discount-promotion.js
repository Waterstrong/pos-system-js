'use strict';

/* when reach the amount then make discount promotion */

var instance = require('../../utils/instance');

var self = {
    fullAmount: 0,
    discountRate: 0
};

module.exports = {
    setAmountDiscount: function(fullAmount, discountRate) {
        self.fullAmount = fullAmount;
        self.discountRate = discountRate;
    },
    calculate: function(item) {
        if(!item || self.fullAmount <= 0 || self.discountRate < 0 || self.discountRate > 1) {
            console.log("full-amount-discount-promotion: item is undefined or fullAmount|discountRate is illegal.");
            return undefined;
        }
        var discountAmount = item.amount / self.fullAmount;
        var subtotal = item.price * self.discountRate * discountAmount + (item.amount - discountAmount) * item.price;
        var newItem = instance.clone(item);
        newItem.price = subtotal / item.amount;
        return newItem;
    }
};