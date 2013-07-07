define([
    'ddApp',
    'components/ddGallery/ddGallery',
    'LocalStorageModule'
], function(){
    ddPrototype = angular.module('ddPrototype', ['ddApp','LocalStorageModule'])
        .config(['$routeProvider', '$locationProvider', function(routeProvider, locationProvider){
            routeProvider
                .when('/', {controller: function(){}})
                .when('/api/:category/:item', {
                    controller: ['$scope', '$routeParams', function(scope, routeParams){
                        scope.templateUrl = routeParams.category + '/' + routeParams.item + '.html';
                    }], 
                    template:'<div ng-include src="templateUrl"></div>'
                });
        }])
        .controller("mainCntl",['$scope', '$element', '$rootScope', '$routeParams', function mainCntl(scope, element, rootScope, routeParams){
            scope.ui = UI_DATA;
            scope.ready = "ready";
            rootScope.$on('$routeChangeSuccess', function(){
               scope.title = "Daru-Dar";
               scope.item = "UI-framework";
               angular.forEach(scope.ui[routeParams.category], function(item){
                    if(item[0] == routeParams.item) {
                        scope.title = item[1];
                        scope.item = item[0];
                        return false;
                    }
                });
            });
        }]);
    angular.bootstrap(document, ['ddPrototype']);
    $('#layout').animate({opacity: 1});
});   
