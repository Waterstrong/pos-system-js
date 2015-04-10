'use strict';
/* print the settlement */

module.exports = {
    applyPrintSettlement: function(shoppingCart, promotionStrategy) {
        console.log('\n=================================================================\n')
        console.log('收银台结算打印小票：');
        console.log('购物明细    （数量	单价    小计）');

        var cartMapper = shoppingCart.calculate(promotionStrategy);
        //console.log('This is the cart data after promotion: ');
        //console.log(cartMapper);


        for(var key in cartMapper) {
            var item = cartMapper[key];
            console.log(item.barcode + "   " + item.amount + "      " + item.price + "    " + item.subtotal);
        }
        var beforePromotion = shoppingCart.getBeforePromotionTotal();
        var afterPromotion = shoppingCart.getAfterPromotionTotal();
        console.log('总计金额（优惠前  优惠后  优惠差价）');
        console.log(afterPromotion+"    "+beforePromotion+"  "+afterPromotion+"  "+(beforePromotion-afterPromotion));

    }
};