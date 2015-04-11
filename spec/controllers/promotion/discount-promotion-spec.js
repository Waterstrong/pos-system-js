describe("DiscountPromotion", function(){
    var DiscountPromotion = require('../../../app/controllers/promotion/discount-promotion');
    var discountPromotion;

    it("should get discount rate when given discount value", function() {
        discountPromotion = new DiscountPromotion(5);
        expect(discountPromotion.getDiscountRate()).toEqual(5);
    });



});