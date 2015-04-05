'use strict';

module.exports = {
    map: function(lines, parser) {
        if(!lines || !parser) return null;
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