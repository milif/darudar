<!doctype html>
<html>
  <head>
    <? error_reporting(E_ALL); $require= '../ddPrototype'; $require_build= '../prototypes/ddPrototype'; include __DIR__.'/../builder/require.php'; ?>
  </head>
  <body style="background: url(background.png);">   
    <div id="layout" ng-controller="mainCntl" ng-class="ready" class="container-fluid" style="opacity: 0;">
        <div class="row-fluid">
            <div class="span2">
                <h4>Components:</h4>
                <ul>
                   <li ng-repeat="component in ui.components"><a title="{{component[1]}}" href="#/api/components/{{component[0]}}">{{component[0]}}</a></li>
                </ul>
            </div>
            <div class="span10">
                <div class="page-header">
                    <h1>{{title}} <small>{{item}}</small></h1>
                </div>
                <div ng-view></div>
            </div>
        </div>   
    </div>
    <script>
        var UI_DATA = {
            'components': [
                ['dd-gallery','Image gallery']
            ]
        };
    </script>     
    <style>
        #layout {
            display: none;
            }
            #layout.ready {
                display: block;
                }
    </style>
  </body>
</html>
