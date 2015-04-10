'use strict';

/* contain goods(barcode, price, etc) list*/

// but how to use singleton


var instance = require('../../utils/instance');

var self = {
    goodsMapper: {}
};

module.exports = {
    getGoods: function(barcode) {
        return self.goodsMapper[barcode];
    },
    add: function(items) {
        if(!items) return undefined;
        items.forEach(function(item){
            self.goodsMapper[item.barcode] = instance.clone(item);
        });
    }
};