'use stric';

/* if subtotal get to xxx then return xxx cash promotion */

var instance = require('../../utils/instance');


//var self = {
//    fullCash: 0,
//    cashBack: 0
//};

module.exports = {
    fullCash: 0,
    cashBack: 0,
    setFullCashBack: function(fullCash, cashBack) {
        this.fullCash = fullCash;
        this.cashBack = cashBack;
    },
    calculate: function(item) {
        if(!item || this.fullCash < 0 || this.cashBack < 0 || this.cashBack > this.fullCash) {
            console.log("full-cash-back-promotion: item is undefined or fullCash|cashBack is illegal.");
            return undefined;
        }
        var totalCost = item.price * item.amount;
        if(totalCost >= this.fullCash) {
            totalCost -= this.cashBack;
        }
        var newItem = instance.clone(item);
        newItem.price = totalCost / item.amount;
        return newItem;
    }
};