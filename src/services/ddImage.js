define(['ddApp'],function(){
    defineService('ddImage', function(){
        function ddImage(){
        }
        ddImage.prototype = {
        }
        ddImage.getSrc = getSrc;
        ddImage.getSize = getSize;
        return ddImage;
        
        function getSrc(src, imgSize, viewSize){
            var size = getDefaultSize(imgSize, viewSize);
            return src;
        }
        function getSize(imgSize, viewSize){
            var ratio = imgSize.width / imgSize.height,
                size = getDefaultSize(imgSize, viewSize);
            if(size.width / ratio > size.height) {
                return {
                    width: size.height * ratio,
                    height: size.height
                };
            } else {
                return {
                    width: size.width,
                    height: size.width / ratio
                };
            }
        }
        function getDefaultSize(imgSize, viewSize){
            var size = {
                width: viewSize.width,
                height: viewSize.height
            };
            if(imgSize.width < size.width && imgSize.height < size.height) {
                return imgSize;
            } else {
                return size;
            }
        }
    });
});
 
