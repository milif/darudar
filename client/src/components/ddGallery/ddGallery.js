defineDirective('ddGallery', ["ddImage", function(ddImage){

    var FIRST_ROW_RATIO = 2.5,
        NEXT_ROWS_RATIO = 4,
        MARGIN = 6;

    function buildImgData(data, cntWidth){
        if(data.length == 0) return data;
        var item,
            ratio,
            totalRatio = 0,
            i;
        for(i=0;i<data.length;i++){
            item = data[i];
            ratio = item.width/item.height;
            item.ratio = ratio;
            totalRatio += ratio;
        }
        var iterator = [data, 0];
        if(data.length == 1){
            item = data[0];
            item._width = Math.min(item.width, cntWidth);
            item._height = Math.round(item._width / item.ratio);
            item._src = ddImage.getSrcBySize(item.src, item._width, item._height);
        } else if(totalRatio >= FIRST_ROW_RATIO + NEXT_ROWS_RATIO || data.length == 2) {
            buildRows(data, cntWidth);
        } else if(data[0].ratio > 1){
            data.type = "rows";
            var rows = [];
            rows.push(getRow(iterator, data[0].ratio));
            pushNextRows(rows, iterator, cntWidth);
        } else {
            data.type = "big";
            var bigItem = data[0],
                vertSumRatio = 0,
                vertMargin = (data.length - 2) * MARGIN,
                rowWidth = cntWidth - MARGIN - 1,
                rowHeight,
                vertWidth,
                totalVertHeight = 0;
            for(i=1; i<data.length; i++){
                item = data[i];
                vertSumRatio += 1 / item.ratio;
            }
            vertWidth = Math.round((rowWidth  - bigItem.ratio * vertMargin) / (1 + bigItem.ratio * vertSumRatio));
            rowHeight = Math.round((rowWidth - vertWidth) / bigItem.ratio);
            if(vertWidth < 0.2 * rowWidth){
                buildRows(data, cntWidth);
            } else {
                for(i=0; i<data.length; i++){
                    item = data[i];
                    if(i==0){
                        item._width = rowWidth - vertWidth;
                        item._height = rowHeight;
                    } else {
                        item._width = vertWidth;
                        item._height = Math.round(vertWidth / item.ratio);
                        totalVertHeight += item._height;
                    }
                    item._src = ddImage.getSrcBySize(item.src, item._width, item._height);
                }
                data[0]._width += rowWidth - data[0]._width - vertWidth;
                item = data[data.length - 1];
                item._height += rowHeight - totalVertHeight - (data.length - 2) * MARGIN;
            }
        }   
        
        return data;
    }
    function buildRows(data, cntWidth){
        var rows = [],
            iterator = [data, 0];
        rows.push(getRow(iterator, FIRST_ROW_RATIO));
        pushNextRows(rows, iterator, cntWidth);
        data.type = "rows";
    }
    function pushNextRows(rows, iterator, cntWidth){
        var data = iterator[0];
        while(iterator[1] < data.length) {
            rows.push(getRow(iterator, NEXT_ROWS_RATIO));
        }
        var lastRow = rows.pop();
        if(lastRow.volume < NEXT_ROWS_RATIO * 0.65) {
            var prevLastRow = rows[rows.length - 1];
            prevLastRow.ratio += lastRow.ratio;
            Array.prototype.push.apply(prevLastRow, lastRow);
        } else {
            rows.push(lastRow);
        }
        var rowWidth,
            rowHeight,
            rowTotalWidth,
            row,
            ii,
            item;
        for(i=0;i<rows.length;i++){
            row = rows[i];
            rowWidth = cntWidth - MARGIN * (row.length - 1) - 1;
            rowHeight = Math.round(rowWidth / row.ratio);
            rowTotalWidth = 0;
            for(ii=0;ii<row.length;ii++){
                item = row[ii];
                if(ii == row.length - 1){
                    item.mod = 'mod_last';
                } else {
                    delete item.mod;
                }
                item._height = rowHeight;
                item._width = Math.round(rowHeight * item.ratio);
                item._src = ddImage.getSrcBySize(item.src, item._width, item._height);
                rowTotalWidth += item._width;
            }
            item = row[row.length - 1];
            item._width += rowWidth - rowTotalWidth;
        }    
    }
    function getRow(iterator, maxRatio){
        var row = [],
            item;
        row.ratio = 0;
        row.volume = 0;
        while(row.volume < maxRatio){
            item = iterator[0][iterator[1]++];
            if(!item) break;
            row.push(item);
            row.ratio += item.ratio, 1 / item.ratio;
            row.volume += Math.max(item.ratio, 1 / item.ratio);
        }
        if(row.volume - maxRatio > 0.15 * maxRatio) {
            var lastItem = row.pop();
            row.ratio -= lastItem.ratio;
            row.volume -= Math.max(lastItem.ratio, 1 / lastItem.ratio);
            iterator[1]--;
        }
        return row;
    }

    return {
        scope: {
            data: '=ddGallery'
        },
        template:
            '<a ng-repeat="img in imgs" ng-class="img.mod" class="dd-b-gallery-item" style="width:{{img._width}}px;height:{{img._height}}px;" >' +
                '<img src="{{img._src}}" style="width:{{img._width}}px;height:{{img._height}}px;" />' +
            '</a>',
        compile: function(tElement){
            tElement.addClass('dd-b-gallery clearfix');
            return function(scope, iElement){
                scope.$watch('data', function(data){
                    iElement
                        .width(iElement.width())
                        .removeClass("mod_" + scope.type);
                    scope.imgs = buildImgData(data, iElement.width());
                    scope.type = scope.imgs.type;
                    iElement.addClass("mod_" + scope.type);
                });
            };
        }
    };
}]);
