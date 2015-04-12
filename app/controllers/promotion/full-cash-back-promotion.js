'use stric';

/* if subtotal get to xxx then return xxx cash promotion */

var Instance = require('../../utils/instance');

function FullCashBackPromotion(fullCash, cashBack) {
    this.fullCash = fullCash;
    this.cashBack = cashBack;
}

FullCashBackPromotion.prototype.calculate = function(item) {
    var self = this;
    if(!item || self.fullCash === undefined || self.fullCash < 0 ||
        self.cashBack === undefined || self.cashBack < 0 || self.cashBack > self.fullCash) {
        throw new Error('full-cash-back-promotion: item is undefined or fullCash|cashBack is illegal.');
        //return undefined;
    }
    var totalCost = item.price * item.amount;
    if(totalCost >= self.fullCash) {
        totalCost -= self.cashBack;
    }
    var newItem = Instance.clone(item);
    newItem.price = totalCost / item.amount;
    return newItem;
};

module.exports = FullCashBackPromotion;