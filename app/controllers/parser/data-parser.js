'use strict';

/* map to parse data from lines */

module.exports = {
    map: function(lines, parser) {
        if(lines === undefined || parser === undefined) return undefined;
        var dataList = [];
        lines.forEach(function(line) {
            dataList.push(parser.parse(line));
        });
        //for(var key in lines) {
        //    dataList.push(parser.parse(lines[key]));
        //}
        return dataList;
    }
};