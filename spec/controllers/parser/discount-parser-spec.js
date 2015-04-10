describe("DiscountParser", function() {
    var discountParser = require('../../../app/controllers/parser/discount-parser');

    it("should be able to parse when given a discount format string", function() {
        var result = discountParser.parse('ITEM001:25');
        expect(result.barcode).toEqual('ITEM001');
        expect(result.promotion.getDiscountRate()).toEqual(0.25);
    });

    it("should be able to parse when given a zero string", function(){
        var result = discountParser.parse('ITEM001:0');
        expect(result.promotion.getDiscountRate()).toEqual(0);
    });

    it("should be able to parse when given number more than hundred", function(){
        var result = discountParser.parse('ITEM001:153');
        expect(result.promotion.getDiscountRate()).toEqual(1.53);
    });

    it("should be able to parse when given negative number string", function(){
        var result = discountParser.parse('ITEM001:-8.5');
        expect(result.promotion.getDiscountRate()).toEqual(-0.085);
    });

    it("should get undefine when given illegal format string", function(){
        var result = discountParser.parse('ITEM000001-75');
        expect(result).toEqual(undefined);
    });

    it("should get undefine when given nothing", function(){
        var result = discountParser.parse();
        expect(result).toEqual(undefined);
    });

    it("should get undefine when given more params", function(){
        var result = discountParser.parse('ITEM000001:75:52');
        expect(result).toEqual(undefined);
    });

    it("should get undefine when given non-number format string", function(){
        var result = discountParser.parse('ITEM000001:x50y');
        expect(result).toEqual(undefined);
    });

});