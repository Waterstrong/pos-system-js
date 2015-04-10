'use strict';

/* shopping cart arrange the goods items and calculate the promotion subtotal */

var instance = require('../../utils/instance');

var self = {
    cartMapper: {},
    //subTotalMapper: {},
    beforePromotionTotal: 0,
    afterPromotionTotal: 0,
    goodsList: {}
};
module.exports = {
    getBeforePromotionTotal: function() {
        return self.beforePromotionTotal;
    },
    getAfterPromotionTotal: function() {
        return self.afterPromotionTotal;
    },
    //getSubtotal: function(barcode) {
    //    return self.subTotalMapper[barcode];
    //},
    getCartMapper: function() {
        return self.cartMapper;
    },
    setGoosdList: function(goodsList) {
        self.goodsList = goodsList;
    },
    add: function(items) {
        if(!self.goodsList.getGoods) {
            console.log("goods list must be set for shopping cart.");
            return undefined;
        }
        if(!items) return;
        items.forEach(function(item) {
            var existItem = self.cartMapper[item.barcode];
            if(existItem) {
                existItem.amount += item.amount;
            } else {
                existItem = instance.clone(item);
                existItem.price = self.goodsList.getGoods(item.barcode).price;
            }
            self.cartMapper[item.barcode] = existItem;
        });
    },
    calculate: function(promotionStrategy) {
        if(!promotionStrategy) return;
        self.beforePromotionTotal = 0;
        self.afterPromotionTotal = 0;
        for(var barcode in self.cartMapper) {
            var item = self.cartMapper[barcode];
            self.beforePromotionTotal += item.amount * item.price;
            // calculate all the promotions in sequence
            var newItem = promotionStrategy.calculate(item);
            // this subtotal is after promotion
            self.cartMapper[barcode].subtotal = newItem.amount * newItem.price;
            self.afterPromotionTotal += self.cartMapper[barcode].subtotal;

            //self.subTotalMapper[barcode] = newItem.amount * newItem.price;
        }
        var totalItem = {
            barcode: 'ITEM_TOTAL',
            price: self.afterPromotionTotal,
            amount: 1
        };
        totalItem = promotionStrategy.calculate(totalItem);
        self.afterPromotionTotal = totalItem.price;
        return self.cartMapper;
    }

};