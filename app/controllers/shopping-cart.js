'use strict';

var cartMapper = {};
module.exports = {
    add: function(items) {
        items.forEach(function(item) {
            var amount = cartMapper[item.barcode];
            cartMapper[item.barcode] = amount ? amount + item.amount : item.amount;
        });
    },
    getCart: function() {
        return cartMapper;
    }

};