'use strict';

describe('FullCashBackPromotion', function(){
    var FullCashBackPromotion = require('../../../app/controllers/promotion/full-cash-back-promotion');
    var fullCashBackPromotion;
    var errorMessage;
    beforeEach(function(){
        fullCashBackPromotion = new FullCashBackPromotion(100, 5);
        errorMessage = 'full-cash-back-promotion: item is undefined or fullCash|cashBack is illegal.';
    });

    it('should able to read full cash and cash back value', function(){
        expect(fullCashBackPromotion.fullCash).toEqual(100);
        expect(fullCashBackPromotion.cashBack).toEqual(5);
    });

    it('should able to throw exception when given nothing', function() {
        expect(function(){
            fullCashBackPromotion.calculate();
        }).toThrowError(errorMessage);
    });

    it('should get promotion when given the tiem', function(){
        var item = {
            barcode: 'ITEM0001',
            price: 50,
            amount: 4
        };
        var result = fullCashBackPromotion.calculate(item);
        expect(result.price * result.amount).toEqual(195);
    });





});