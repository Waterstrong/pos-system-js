'use strict';

/* promotion strategy contains all the promotions */

var Instance = require('../../utils/instance');


function PromotionStrategy() {
    this.promotionsMapper = {};
}

PromotionStrategy.prototype.attach = function(promotionItems) {
    var self = this;
    if(!promotionItems) return;
    promotionItems.forEach(function(promotionItem) {
        var existPromotions = self.promotionsMapper[promotionItem.barcode];
        if(!existPromotions) {
            self.promotionsMapper[promotionItem.barcode] = [];
        }
        self.promotionsMapper[promotionItem.barcode].push(promotionItem.promotion);
    });
};

PromotionStrategy.prototype.calculate = function(item) {
    var self = this;
    if(!item) {
        console.log("promotion-strategy: item is undefined.");
        return undefined;
    }
    var promotions = self.promotionsMapper[item.barcode];
    var newItem = Instance.clone(item); // TODO: how to solve the ref problem
    if(promotions) {
        promotions.forEach(function(promotion){
            newItem = promotion.calculate(newItem);
        });
    }
    return newItem;
};

module.exports = PromotionStrategy;