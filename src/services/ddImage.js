define(['ddApp'],function(){
    defineService('ddImage', function(){
        function ddImage(){
        }
        ddImage.prototype = {
        }
        ddImage.getSrcBySize = getSrcBySize;
        return ddImage;
        
        function getSrcBySize(src, width, height){
            return src;
        }
    });
});

