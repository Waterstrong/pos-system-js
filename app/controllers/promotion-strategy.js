'use strict';

/* promotion strategy contains all the promotions */

var promotionMapper = {
    barcode: {
        promotions: []
    }
};
module.exports = {
    calculate: function(item) {
        var promotions = promotionMapper[item.barcode];
        if(promotions) {
            promotions.forEach(function(promotion){
                item = promotion.calculate(item);
            });
        }
        return item;
    }
};