(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[uiMain Error] ',
    appTitle: 'uiMain'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', '$httpProvider', 'routerHelperProvider', 'exceptionHandlerProvider', '$locationProvider'];
  /* @ngInject */
  function configure($logProvider, $httpProvider, routerHelperProvider, exceptionHandlerProvider, $locationProvider) {
    // enable HTML5 mode as hashbang-type URLs will not work with mod_rewrite redirection
    $locationProvider.html5Mode(true);

    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});

    //$httpProvider
    $httpProvider.interceptors.push('myInterceptors');
    //$urlRouterProvider.when('/', 'overall/dashboard');
  }

  // config localStorage
  core.config(localStorageConfig);
  localStorageConfig.$inject = ['localStorageServiceProvider'];
  function localStorageConfig(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('zoro');
  }

  // config theme
  core.config(themeConfig);
  themeConfig.$inject = ['$mdThemingProvider'];
  function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  }

  // connected facebook
  core.config(connectFacebook);
  connectFacebook.$inject = ['ezfbProvider'];
  function connectFacebook(ezfbProvider) {
    /**
     * Basic setup
     *
     * https://github.com/pc035860/angular-easyfb#configuration
     */
    ezfbProvider.setInitParams({
      appId: '1534077266909553'
    });
  }

})();
