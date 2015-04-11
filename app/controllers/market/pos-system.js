'use strict';

/* pos system main */

var dataProvider = require('../../services/data-provider');

var dataParser = require('../parser/data-parser');
var goodsItemParser = require('../parser/goods-item-parser');
var cartParser = require('../parser/shopping-cart-parser');
var DiscountParser = require('../parser/discount-parser');
var secondHalfPriceParser = require('../parser/second-half-price-parser');
var fullCashBackParser = require('../parser/full-cash-back-parser');

var goodsList = require('./goods-list');

var shoppingCart = require('./shopping-cart');

var kkPos = require('./kk-pos');

var promotionStrategy = require('../promotion/promotion-strategy');

module.exports = {
    run: function(config) {
        if(!config) return undefined;

        // get the goods data
        var goodsData = dataParser.map(dataProvider.read(config.FILE_PATH.itemListFile), goodsItemParser);
        console.log('This is the goods data: ');
        console.log(goodsData);
        goodsList.add(goodsData);
        shoppingCart.setGoosdList(goodsList);

        // get the cart data
        var cartData = dataParser.map(dataProvider.read(config.FILE_PATH.cartFile), cartParser);
        console.log('This is the original cart data: ');
        console.log(cartData);
        shoppingCart.add(cartData);
        console.log('This is the new cart data: ');
        console.log(shoppingCart.getCartMapper());

        var discountPromotionData = dataParser.map(dataProvider.read(config.FILE_PATH.discountPromotionFile), new DiscountParser());
        console.log('This is the discount promotion data: ');
        console.log(discountPromotionData);

        var fullAmountPromotionData = dataParser.map(dataProvider.read(config.FILE_PATH.secondHalfPricePromotionFile), secondHalfPriceParser);
        console.log('This is the full amount promotion data: ');
        console.log(fullAmountPromotionData);

        var fullCashBackPromotionData = dataParser.map(dataProvider.read(config.FILE_PATH.fullCashBackPromotionFile), fullCashBackParser);
        console.log('This is the full cash back promotion data: ');
        console.log(fullCashBackPromotionData);


        promotionStrategy.attach(discountPromotionData);
        promotionStrategy.attach(fullAmountPromotionData);
        //promotionStrategy.attach(fullCashBackPromotionData);

        kkPos.applyPrintSettlement(shoppingCart, promotionStrategy);

        return "hahaha";
    }

};