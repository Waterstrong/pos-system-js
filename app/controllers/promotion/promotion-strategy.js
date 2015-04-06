'use strict';

/* promotion strategy contains all the promotions */

var instance = require('../../utils/instance');

var self = {
    promotionsMapper: {}
};

module.exports = {
    attach: function(promotionList) {
        if(!promotionList) return;
        promotionList.forEach(function(promotion) {
            var existPromotions = self.promotionsMapper[promotion.barcode];
            if(!existPromotions) {
                self.promotionsMapper[promotion.barcode] = [];
            }
            self.promotionsMapper[promotion.barcode].push(promotion);
        });
    },
    calculate: function(item) {
        if(!item) {
            console.log("promotion-strategy: item is undefined.");
            return undefined;
        }
        var promotions = self.promotionsMapper[item.barcode];
        var newItem = instance.clone(item); // TODO: how to solve the ref problem
        if(promotions) {
            promotions.forEach(function(promotion){
                newItem = promotion.calculate(newItem);
            });
        }
        return newItem;
    }
};