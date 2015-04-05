'use strict';

module.exports = {
    calculate: function(item) {
        item.price = item.price * 0.8;
        return item;
    }
};