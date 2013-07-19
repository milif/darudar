define(['ddApp','services/ddImage','services/ddPopup/ddPopup','css!components/ddImage/ddImage'],function(){
    defineDirective('ddImage', ["ddImage", 'ddPopup', '$compile', '$rootScope', '$parse', function(ddImage, ddPopup, $compile, $rootScope, $parse){
        var $ = angular.element,
            popupGalleryTpl = $compile($(
                '<div class="dd-b-modalimage">' +
                    '<img style="width:{{size.width}}px;height:{{size.height}}px;" ng-src="{{src}}" />' +
                    '<p class="dd-c-title">{{title}}</p>' +
                '</div>'
            ));
        return {
            compile: function(tElement, tAttrs){
                return function(scope, iElement, iAttrs){
                    iElement.on('click', function(e){
                        e.preventDefault();
                        var imgSize = scope.$eval(iAttrs.ddImageSize),
                            size = optimateViewSize(ddPopup.getViewSize()),
                            src = ddImage.getSrc(iAttrs.href, imgSize, size),
                            srcSize = ddImage.getSize(imgSize, size),
                            calcSize = calculateSize(srcSize, size);
                                                  
                        ddPopup.open({
                            mod: 'image' + (iAttrs.title ? ' has_title' : ''),
                            content: {
                                template: '',
                                width: calcSize.width, 
                                height: calcSize.height
                            },
                            loader: function(done){
                                $(new Image())
                                    .attr("src", src)
                                    .load(function(){ 
                                        var scope = $rootScope.$new();
                                        
                                        scope.mod = iAttrs.title ? 'mod_title' : '';
                                        scope.src = src;
                                        scope.title = iAttrs.title;
                                        scope.size = calcSize;
                                        
                                        popupGalleryTpl(scope, function(el){
                                            done({el: el, width: calcSize.width, height: calcSize.height});
                                        });
                                        scope.$digest();
                                    });
                            }
                        });
                    });
                };
            }
        };
        function calculateSize(originalSize, viewSize){
            var ratio = originalSize.width / originalSize.height,
                height = viewSize.width / ratio <= viewSize.height ? viewSize.width / ratio : viewSize.height,
                width = height * ratio,
                volume = width * height,
                volumeOriginal = originalSize.width * originalSize.height;
            
            if(volume > 2 * volumeOriginal){
                var k = Math.sqrt(2);
                width = originalSize.width * k;
                height = originalSize.height * k;
            }
                            
            return {
                width: parseInt(width),
                height: parseInt(height)
            };
        }        
        function optimateViewSize(viewSize){
            return {
                width: Math.max(viewSize.width, 500),
                height: Math.max(viewSize.height, 500)
            };
        }
        function getTpl(src, size){
            return 
        }
    }]);    
});
