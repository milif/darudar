var appModule;
define(['angular','css!vendor/bootstrap/css/bootstrap','css!ddApp'], function(){    
    appModule = angular.module('ddApp',['ngLocale'])
        .config(['$provide',function($provide){
            $provide.factory('$ddData', function(){
                return {
                    get: function(value){
                        return DD_Data[value] || value;
                    }
                }
            });
        }])
        .run(['$locale', function($locale){
            $locale.DD = DD_LOCALE;
        }]);
    return appModule;
});

var DD_DATA = window.DD_DATA || {};
function defineDirective(name, directive){
    appModule.directive(name, directive);
}
function defineService(name, model){
    appModule.factory(name, model);
}
