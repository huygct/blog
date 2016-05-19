(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('myInterceptors', myInterceptors);

  myInterceptors.$inject = ['$q', '$injector', 'localStorageService', 'appConstant'];
  /* @ngInject */
  function myInterceptors($q, $injector, localStorageService, appConstant) {
    var flag = 1;
    var service = {
      request: function (config) {
        return addHeader(config);
      },
      responseError: function (response) {
        preformRejection(response);

        // return default behavior
        return $q.reject(response);
      }
    };

    return service;

    function addHeader (config) {
      var user = localStorageService.get(appConstant.USER_APP) ;
      var token = user ? user.token : null;
      if (token) {
        // Set the `Authorization` header for every outgoing HTTP request: Authorization: Bearer <TOKEN_STRING>
        config.headers.Authorization = 'Bearer ' + token;
        flag = 1;
      }

      return config;
    }

    function preformRejection (response) {
      if (response.status === 401 || response.status === 403) {
        localStorageService.remove(appConstant.USER_APP);
        $injector.get('$state').go('app.404');
      }
      return $q.reject(response);
    }
  }
})();
