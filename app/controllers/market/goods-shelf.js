'use strict';

/* contain goods(barcode, price, etc) list, this is the goods shelf */

// but how to use singleton


var Instance = require('../../utils/instance');

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
            self.goodsMapper[item.barcode] = Instance.clone(item);
        });
    }
};