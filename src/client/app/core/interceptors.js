(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('myInterceptors', trackingInterceptors);

  trackingInterceptors.$inject = ['loginService', '$q', '$location'];
  /* @ngInject */
  function trackingInterceptors(loginService, $q, $location) {
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
      var token = loginService.getCurrentUser().token;
      if (token) {
        // Set the `Authorization` header for every outgoing HTTP request: Authorization: Bearer <TOKEN_STRING>
        config.headers.Authorization = 'Bearer ' + token;
        flag = 1;
      }

      return config;
    }

    function preformRejection (response) {
      if (response.status === 401) {
        // handle session timeouts: notice timeout on login dialog
        if(angular.isFunction(loginService.signInAgain) && flag === 1){
          loginService.signInAgain('Session timeout! Please login again.');
          flag = 0;
        }else{// remove user from localStorage
          localStorage.removeItem('user');
        }
      } else if(response.status === 403){
        $location.path('/403');
      }
    }
  }
})();
