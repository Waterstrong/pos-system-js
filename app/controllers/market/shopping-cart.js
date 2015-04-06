'use strict';

/* shopping cart arrange the goods items and calculate the promotion subtotal */

var goodsList = require('./goods-list');

//var cartMapper = {};
//var subTotalMapper = {};
//var beforePromotionTotal;
//var afterPromotionTotal;

var self = {
    cartMapper: {},
    //subTotalMapper: {},
    beforePromotionTotal: 0,
    afterPromotionTotal: 0
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
    //getCartMapper: function() {
    //    return self.cartMapper;
    //},
    add: function(items) {
        if(!items) return;
        items.forEach(function(item) {
            var existItem = self.cartMapper[item.barcode];
            if(existItem) {
                existItem.amount += item.amount;
            } else {
                existItem = item;
                existItem.price = 40;//goodsList.getGoods(item.barcode).getPrice();
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
            self.cartMapper[barcode].subTotal = newItem.amount * newItem.price;
            self.afterPromotionTotal += self.cartMapper[barcode].subTotal;

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