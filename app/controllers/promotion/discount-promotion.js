'use strict';

/* make xxx discount promotion */

var instance = require('../../utils/instance');

// how to solve class private variable problem ???

//var self = {
//    discountRate: 1
//};

module.exports = {
    //discountRate: 1,
    setDiscountRate: function(discountRate) {
        this.discountRate = discountRate;
    },
    getDiscountRate: function() {
        return this.discountRate;
    },
    calculate: function(item) {
        if(!item || this.discountRate < 0 || this.discountRate > 1) {
            console.log("discount-promotion: item is undefined or rate is illegal.");
            return undefined;
        }
        var newItem = instance.clone(item); // TODO: how to solve the ref
        newItem.price = item.price * this.discountRate;
        return newItem;
    }
};