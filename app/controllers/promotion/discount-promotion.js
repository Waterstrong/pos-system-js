'use strict';

/* make xxx discount promotion */

var instance = require('../../utils/instance');

var self = {
    discountRate: 1
};

module.exports = {
    setDiscountRate: function(discountRate) {
        self.discountRate = discountRate;
    },
    getDiscontRate: function() {
        return self.discountRate;
    },
    calculate: function(item) {
        if(!item) return undefined;
        var newItem = instance.clone(item); // TODO: how to solve the ref
        newItem.price = item.price * self.discountRate;
        return newItem;
    }
};