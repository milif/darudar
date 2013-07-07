var appModule;
define(['angular'], function(){
    appModule = angular.module('ddApp', [])
        .config(['$provide', function($provide){
            $provide.factory('$ddData', function(){
                return {
                    get: function(value){
                        return DD_Data[value] || value;
                    }
                }
            });
        }]); 
    return appModule;
});

var DD_Data = window.DD_Data || {};
function defineDirective(name, directive){
    appModule.directive(name, directive);
}
function defineService(name, model){
    appModule.factory(name, model);
}
