var appModule = angular.module('ddApp', [])
    .config(['$provide', function($provide){
        $provide.factory('$ddData', function(){
            return {
                get: function(value){
                    return DD_Data[value] || value;
                }
            }
        });
    }]);
var DD_Data = window.DD_Data || {};
function defineDirective(name, directive){
    appModule.directive(name, directive);
}
function defineModel(name, model){
    appModule.factory(name, model);
}
