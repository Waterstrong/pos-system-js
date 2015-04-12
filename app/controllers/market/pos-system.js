'use strict';

/* pos system main */

var dataProvider = require('../../services/data-provider');

var DataParser = require('../parser/data-parser');
var GoodsItemParser = require('../parser/goods-item-parser');
var CartParser = require('../parser/shopping-cart-parser');
var DiscountParser = require('../parser/discount-parser');
var SecondHalfPriceParser = require('../parser/second-half-price-parser');
var FullCashBackParser = require('../parser/full-cash-back-parser');

var GoodsShelf = require('./goods-shelf');

var ShoppingCart = require('./shopping-cart');

var KKPos = require('./kk-pos');

var PromotionStrategy = require('../promotion/promotion-strategy');

module.exports = {
    run: function(config) {
        if(!config) return undefined;

        // get the goods data
        var goodsData = DataParser.map(dataProvider.read(config.FILE_PATH.itemListFile), GoodsItemParser);
        console.log('This is the goods data: ');
        console.log(goodsData);
        GoodsShelf.add(goodsData);
        var shoppingCart = new ShoppingCart(GoodsShelf);

        // get the cart data
        var cartData = DataParser.map(dataProvider.read(config.FILE_PATH.cartFile), CartParser);
        console.log('This is the original cart data: ');
        console.log(cartData);
        shoppingCart.add(cartData);
        console.log('This is the new cart data: ');
        console.log(shoppingCart.getCartMapper());

        var discountPromotionData = DataParser.map(dataProvider.read(config.FILE_PATH.discountPromotionFile), new DiscountParser());
        console.log('This is the discount promotion data: ');
        console.log(discountPromotionData);

        var fullAmountPromotionData = DataParser.map(dataProvider.read(config.FILE_PATH.secondHalfPricePromotionFile), SecondHalfPriceParser);
        console.log('This is the full amount promotion data: ');
        console.log(fullAmountPromotionData);

        var fullCashBackPromotionData = DataParser.map(dataProvider.read(config.FILE_PATH.fullCashBackPromotionFile), FullCashBackParser);
        console.log('This is the full cash back promotion data: ');
        console.log(fullCashBackPromotionData);


        var promotionStrategy = new PromotionStrategy();

        promotionStrategy.attach(discountPromotionData);
        promotionStrategy.attach(fullAmountPromotionData);
        //promotionStrategy.attach(fullCashBackPromotionData);

        KKPos.applyPrintSettlement(shoppingCart, promotionStrategy);

        return "hahaha";
    }

};