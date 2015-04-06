'use strict';

/* pos system main */

var dataProvider = require('../../services/data-provider');

var dataParser = require('../parser/data-parser');
var cartParser = require('../parser/shopping-cart-parser');

var shoppingCart = require('./shopping-cart');

var discountPromotion = require('../promotion/discount-promotion');
var promotionStrategy = require('../promotion/promotion-strategy');

module.exports = {
    run: function(config) {
        if(!config) return undefined;
        // get the cart data
        var cartData = dataParser.map(dataProvider.read(config.FILE_PATH.cartFile), cartParser);
        shoppingCart.add(cartData);

        //var promotionData = dataParser.map();

        discountPromotion.setDiscountRate(0.75);
        var promotionData = [{
                barcode: 'ITEM000001',
                promotion: discountPromotion
            }, {
                barcode: 'ITEM000005',
                promotion: discountPromotion
            }
        ];

        promotionStrategy.attach(promotionData);
        var cartMapper = shoppingCart.calculate(promotionStrategy);

        console.log(cartMapper);

        return "hahaha";
    }

};