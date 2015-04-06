'use strict';

/* pos system main */

var dataProvider = require('../../services/data-provider');

var dataParser = require('../parser/data-parser');
var cartParser = require('../parser/shopping-cart-parser');

var shoppingCart = require('./shopping-cart');

var discountPromotion = require('../promotion/discount-promotion');

module.exports = {
    run: function(config) {

        // get the cart data
        var cartData = dataParser.map(dataProvider.read(config.FILE_PATH.cartFile), cartParser);
        shoppingCart.add(cartData);
        var cartMapper = shoppingCart.calculate(discountPromotion);

        console.log(cartMapper);

        return "hahaha";
    }

};