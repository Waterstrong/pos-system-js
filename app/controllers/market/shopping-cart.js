'use strict';

/* shopping cart arrange the goods items and calculate the promotion subtotal */

var Instance = require('../../utils/instance');

function ShoppingCart(goodsShelf) {
    this.cartMapper = {};
    this.beforePromotionTotal = 0;
    this.afterPromotionTotal = 0;
    this.goodsShelf = goodsShelf;
}

ShoppingCart.prototype.getBeforePromotionTotal = function() {
    return this.beforePromotionTotal;
};

ShoppingCart.prototype.getAfterPromotionTotal = function() {
    return this.afterPromotionTotal;
};

ShoppingCart.prototype.getCartMapper = function() {
    return this.cartMapper;
};

ShoppingCart.prototype.add = function(items) {
    var self = this;
    if(self.goodsShelf === undefined) {
        console.log("goods list must be set for shopping cart.");
        return undefined;
    }
    if(!items) return;
    items.forEach(function(item) {
        var existItem = self.cartMapper[item.barcode];
        if(existItem) {
            existItem.amount += item.amount;
        } else {
            existItem = Instance.clone(item);
            existItem.price = self.goodsShelf.getGoods(item.barcode).price;
        }
        self.cartMapper[item.barcode] = existItem;
    });
};

ShoppingCart.prototype.calculate = function(promotionStrategy) {
    var self = this;
    if(!promotionStrategy) return;
    self.beforePromotionTotal = 0;
    self.afterPromotionTotal = 0;
    for(var barcode in self.cartMapper) {
        var item = self.cartMapper[barcode];
        self.beforePromotionTotal += item.amount * item.price;
        // calculate all the promotions in sequence
        var newItem = promotionStrategy.calculate(item);
        self.cartMapper[barcode].subtotal = newItem.amount * newItem.price;
        self.afterPromotionTotal += self.cartMapper[barcode].subtotal;
    }
    var totalItem = {
        barcode: 'ITEM_TOTAL',
        price: self.afterPromotionTotal,
        amount: 1
    };
    totalItem = promotionStrategy.calculate(totalItem);
    self.afterPromotionTotal = totalItem.price;
    return self.cartMapper;
};

module.exports = ShoppingCart;