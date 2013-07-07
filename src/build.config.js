/*
 * java -classpath 'ABSOLUTE_PATH_TO/js.jar':'ABSOLUTE_PATH_TO/compiler.jar' org.mozilla.javascript.tools.shell.Main 'PATH_TO/r.js' -o 'ABSOLUTE_PATH_TO/build.config.js' name=../RELATIVE_TO_build_config/MODULE insertRequire=RELATIVE_TO_build_config/MODULE out=RELATIVE_TO_build_config/COMPILED.js
 */
({
      baseUrl: ".",
      //optimize: "none",
      //optimizeCss: "standard",
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
