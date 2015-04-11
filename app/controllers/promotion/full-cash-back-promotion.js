'use stric';

/* if subtotal get to xxx then return xxx cash promotion */

var Instance = require('../../utils/instance');

function FullCashBackPromoiton(fullCash, cashBack) {
    this.fullCash = fullCash;
    this.cashBack = cashBack;
}

FullCashBackPromoiton.prototype.calculate = function(item) {
    if(!item || this.fullCash === undefined || this.fullCash < 0 ||
        this.cashBack === undefined || this.cashBack < 0 || this.cashBack > this.fullCash) {
        throw new Error('full-cash-back-promotion: item is undefined or fullCash|cashBack is illegal.');
        //return undefined;
    }
    var totalCost = item.price * item.amount;
    if(totalCost >= this.fullCash) {
        totalCost -= this.cashBack;
    }
    var newItem = Instance.clone(item);
    newItem.price = totalCost / item.amount;
    return newItem;
};

module.exports = FullCashBackPromoiton;