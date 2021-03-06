'use strict';

module.exports = {
    toInt: function(arg) {
        if(arg === undefined) return undefined;
        var val = parseInt(arg, 10);
        return isNaN(val) ? undefined : val;
    },
    toFloat: function(arg) {
        if(arg === undefined) return undefined;
        var val = parseFloat(arg, 10);
        //ENOB = 2,
        //tempNum = Math.pow(10, ENOB);
        //return isNaN(val) ? undefined : Math.round(val * tempNum) / tempNum;
        return isNaN(val) ? undefined : parseFloat(val.toFixed(2));

    }
};