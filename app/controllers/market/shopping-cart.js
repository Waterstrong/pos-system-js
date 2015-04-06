'use strict';

/* shopping cart arrange the goods items and calculate the promotion subtotal */

var goodsList = require('./goods-list');

var cartMapper = {};
var subTotalMapper = {};
var beforePromotionTotal;
var afterPromotionTotal;
module.exports = {
    getBeforePromotionTotal: function() {
        return beforePromotionTotal;
    },
    getAfterPromotionTotal: function() {
        return afterPromotionTotal;
    },
    getSubtotal: function(barcode) {
        return subTotalMapper[barcode];
    },
    //getCartMapper: function() {
    //    return cartMapper;
    //},
    add: function(items) {
        if(!items) return;
        items.forEach(function(item) {
            var existItem = cartMapper[item.barcode];
            if(existItem) {
                existItem.amount += item.amount;
            } else {
                existItem = item;
                existItem.price = 5;//goodsList.getGoods(item.barcode).getPrice();
            }
            cartMapper[item.barcode] = existItem;
        });
    },
    calculate: function(promotionStrategy) {
        if(!promotionStrategy) return;
        beforePromotionTotal = 0;
        afterPromotionTotal = 0;
        for(var barcode in cartMapper) {
            var item = cartMapper[barcode];
            beforePromotionTotal += item.amount * item.price;
            // calculate all the promotions in sequence
            var newItem = promotionStrategy.calculate(item);
            afterPromotionTotal += newItem.amount * newItem.price;
            subTotalMapper[barcode] = newItem.amount * newItem.price;
        }
        var totalItem = {
            barcode: 'ITEM_TOTAL',
            price: afterPromotionTotal,
            amount: 1
        };
        totalItem = promotionStrategy.calculate(totalItem);
        afterPromotionTotal = totalItem.price;
        return cartMapper;
    }

};