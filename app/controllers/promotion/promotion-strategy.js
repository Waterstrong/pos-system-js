'use strict';

/* promotion strategy contains all the promotions */

var instance = require('../../utils/instance');

var promotionMapper = {
    barcode: {
        promotions: []
    }
};
module.exports = {
    calculate: function(item) {
        if(!item) {
            console.log("promotion-strategy: item is undefined.");
            return undefined;
        }
        var promotions = promotionMapper[item.barcode];
        var newItem = instance.clone(item); // TODO: how to solve the ref problem
        if(promotions) {
            promotions.forEach(function(promotion){
                newItem = promotion.calculate(newItem);
            });
        }
        return newItem;
    }
};