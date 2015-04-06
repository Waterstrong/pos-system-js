'use stric';

/* if subtotal get to xxx then return xxx cash promotion */

var instance = require('../../utils/instance');

var self = {
    fullCash: 0,
    cashBack: 0
};

module.exports = {
    setFullCashBack: function(fullCash, cashBack) {
        self.fullCash = fullCash;
        self.cashBack = cashBack;
    },
    calculate: function(item) {
        if(!item || self.fullCash < 0 || self.cashBack < 0 || self.cashBack > self.fullCash) {
            console.log("full-cash-back-promotion: item is undefined or fullCash|cashBack is illegal.");
            return undefined;
        }
        var totalCost = item.price * item.amount;
        if(totalCost >= self.fullCash) {
            totalCost -= self.cashBack;
        }
        var newItem = instance.clone(item);
        newItem.price = totalCost / item.amount;
        return newItem;
    }
};