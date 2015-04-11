describe("DiscountPromotion", function(){
    var DiscountPromotion = require('../../../app/controllers/promotion/discount-promotion');
    var discountPromotion;
    var itemForTest;
    var errorMessage;
    beforeEach(function(){
        discountPromotion = new DiscountPromotion(5);
        itemForTest = {
            barcode: 'ITEM00001',
            price: 100
        };
        errorMessage = 'discount-promotion: item is undefined or rate is illegal.';
    });

    it("should get discount rate when given discount value", function() {
        expect(discountPromotion.getDiscountRate()).toEqual(5);
    });

    it('should get exception when given nothing', function() {
        expect(function(){
            discountPromotion.calculate();
        }).toThrowError(errorMessage);
    });

    it('should get exception when given a discount rate more than one', function(){
        discountPromotion.setDiscountRate(1.1);
        expect(function(){
            discountPromotion.calculate(itemForTest);
        }).toThrowError(errorMessage);
    });
    
    it('should get exception when given a discount rate less than zero', function(){
       discountPromotion.setDiscountRate(-0.1);
       expect(function(){
            discountPromotion.calculate(itemForTest);
       }).toThrowError(errorMessage);
    });


    it('should get right item price when given a discount', function(){
        discountPromotion.setDiscountRate(0.8);
        var newItem = discountPromotion.calculate(itemForTest);
        expect(newItem.price).toEqual(80);
    });


});