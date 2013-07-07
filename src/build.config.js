({
      baseUrl: ".",
      //optimize: "none",
      separateCSS: true,
      include:['requireLib'],
      paths: {
          'requireLib': 'vendor/requirejs/require',
          'angular': 'vendor/angular/angular',
          'LocalStorageModule': 'vendor/localStorageService/LocalStorageModule'
      },
      shim: {
          'angular': { deps:['vendor/jquery/jquery','css!vendor/bootstrap/css/bootstrap'], export: 'angular'},
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
