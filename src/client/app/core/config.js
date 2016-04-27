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

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});
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

})();
