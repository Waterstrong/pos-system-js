'use strict';

module.exports = {
    positiveInt: function(arg) {
        if(!arg) return undefined;
        var val = parseInt(arg, 10);
        return isNaN(val) ? undefined : (val <= 0 ? undefined : val);
    }
};