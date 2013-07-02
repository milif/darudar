angular.module('ddPrototype', ['ddApp','LocalStorageModule'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {controller: function(){}})
            .when('/api/:category/:item', {
                controller: function($scope, $routeParams){
                    $scope.templateUrl = $routeParams.category + '/' + $routeParams.item + '.html';
                }, 
                template:'<div ng-include src="templateUrl"></div>'
            });
    });

function mainCntl($scope, $element, $rootScope, $routeParams){
    $scope.ui = UI_DATA;
    $scope.ready = "ready";
    $rootScope.$on('$routeChangeSuccess', function(){
       $scope.title = "Daru-Dar";
       $scope.item = "UI-framework";
       angular.forEach($scope.ui[$routeParams.category], function(item){
            if(item[0] == $routeParams.item) {
                $scope.title = item[1];
                $scope.item = item[0];
                return false;
            }
        });
    });
}    
