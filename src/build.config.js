({
      baseUrl: ".",
      //optimize: "none",
      separateCSS: true,
      paths: {
          'requireLib': 'vendor/requirejs/require',
          'angular': 'vendor/angular/angular.min',
          'LocalStorageModule': 'vendor/localStorageService/LocalStorageModule'
      },
      shim: {
          'angular': { deps:['vendor/jquery/jquery'], export: 'angular'},
          'LocalStorageModule': {deps:['angular']}
      },
      map: {
        '*': {
          css: 'vendor/requirejs/require-css/css-builder'
        }
      },
      wrap: {
        start: "(function(){",
        end: "require.config({" +
                "map: {" +
                  "'*': {" +
                    "'css': 'vendor/requirejs/require-css/css-builder'" +
                  "}" +
                "}" +
            "});" +
        "})();"
      }
})
