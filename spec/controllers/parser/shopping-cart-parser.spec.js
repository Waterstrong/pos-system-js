'use strict';
describe('ShoppingCartParser', function(){
    var ShoppingCartParser = require('../../../app/controllers/parser/shopping-cart-parser');
    it('should be able to parse when given a line with amount', function(){
        var item = ShoppingCartParser.parse('ITEM0001-5');
        expect(item.barcode).toEqual('ITEM0001');
        expect(item.amount).toEqual(5);
    });

    it('should be able to parse when given a line without amount', function(){
        var item = ShoppingCartParser.parse('ITEM0002');
        expect(item.barcode).toEqual('ITEM0002');
        expect(item.amount).toEqual(1);
    });

    //it('should get undefine when given non-number amount', function(){
    //    var item = ShoppingCartParser.parse('ITEM0003-fd5');
    //    expect(item).toEqual(undefined);
    //});

    it('should able to get correct amount when given a float amount', function(){
        var item = ShoppingCartParser.parse('ITEM0004-3.5');
        expect(item.barcode).toEqual('ITEM0004');
        expect(item.amount).toEqual(3);
    });
});