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
        if(!item) return undefined;
        var newItem = instance.clone(item); // TODO: how to solve the ref problem
        var promotions = promotionMapper[item.barcode];
        if(promotions) {
            promotions.forEach(function(promotion){
                newItem = promotion.calculate(newItem);
            });
        }
        return newItem;
    }
};