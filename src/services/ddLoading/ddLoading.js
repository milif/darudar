define(['ddApp','css!services/ddLoading/ddLoading'],function(){
    defineService('ddLoading', ['$animator', function($animator){
        var loadingTpl = '<div class="dd-b-loading" ng-animate="{enter:\'dd-a-fade-enter\', leave:\'dd-a-fade-leave\'}"></div>';
            ddLoading = {};
        ddLoading.show = function(parentEl, scope, cfg){
            var loadingEl = $(loadingTpl),
                animator = $animator(scope, {
                    ngAnimate: loadingEl.attr('ng-animate')
                });
            
            cfg = cfg || {};
            
            if(cfg.mod) loadingEl.addClass('mod_' + cfg.mod);
            
            animator.enter(loadingEl, parentEl);           
            
            function done(){
                animator.leave(loadingEl, parentEl);
            }
            
            return done;
        }
        return ddLoading;
    }]);
});
