'use strict';

/* use clone to solve the ref problem */
var clone = function (obj) {
    if (typeof (obj) != 'object')
        return obj;

    var re = {};
    if (obj.constructor==Array)
        re = [];

    for ( var i in obj) {
        re[i] = clone(obj[i]);
    }

    return re;
};

module.exports = {
    clone: clone
};