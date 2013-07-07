require.config({
    baseUrl: 'src',
    waitSeconds: 600,
    paths: {
        'angular': 'vendor/angular/angular',
        'LocalStorageModule': 'vendor/localStorageService/LocalStorageModule'
    },
    shim: {
        'angular': { deps:['vendor/jquery/jquery','css!vendor/bootstrap/css/bootstrap'], export: 'angular'},
        'LocalStorageModule': {deps:['angular']}
    },
    map: {
      '*': {
        'css': 'vendor/requirejs/require-css/css'
      }
    }
});
