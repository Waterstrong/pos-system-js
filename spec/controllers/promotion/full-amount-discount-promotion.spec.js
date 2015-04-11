'use strict';

describe('FullAmountDiscountPromotion', function(){
    var FullAmountDiscountPromotion = require('../../../app/controllers/promotion/full-amount-discount-promotion');
    var fullAmountDiscountPromotion;
    var errorMessage;
    beforeEach(function(){
        fullAmountDiscountPromotion = new FullAmountDiscountPromotion(2, 0.5);
        errorMessage = 'full-amount-discount-promotion: item is undefined or fullAmount|discountRate is illegal.';
    });

    it('should get right full amount and discount rate when given init value', function(){
        expect(fullAmountDiscountPromotion.getFullAmount()).toEqual(2);
        expect(fullAmountDiscountPromotion.getDiscountRate()).toEqual(0.5);
    });

    it('should get right subtotal when given the general item', function(){
        var item = {
            barcode: 'ITEM0001',
            price: 100,
            amount: 1
        };
        var result = fullAmountDiscountPromotion.calculate(item);
        expect(result.price * result.amount).toEqual(100);
    });

    it('should get discount subtotal when given more amount', function(){
        var item = {
            barcode: 'ITEM0001',
            price: 100,
            amount: 5
        };
        var result = fullAmountDiscountPromotion.calculate(item);
        expect(result.price * result.amount).toEqual(400);
    });

    it('should be able to get exception when given nothing', function(){
        expect(function(){
            fullAmountDiscountPromotion.calculate();
        }).toThrowError(errorMessage);
    });

});