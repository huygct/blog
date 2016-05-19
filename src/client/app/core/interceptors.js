(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('myInterceptors', myInterceptors);

  myInterceptors.$inject = ['$q', '$window', '$injector', 'localStorageService', 'appConstant', '$location'];
  /* @ngInject */
  function myInterceptors($q, $window, $injector, localStorageService, appConstant, $location) {
    var flag = 1;
    var service = {
      request: function (config) {
        var url = $location.path();
        var param1 = url.split('/')[1] || '';
        if(param1 === 'admin') {
          return addHeaderAdmin(config);
        } else {
          return addHeaderUser(config);
        }
      },
      responseError: function (response) {
        preformRejection(response);

        // return default behavior
        return $q.reject(response);
      }
    };

    return service;

    function addHeaderAdmin (config) {
      var adminString = $window.sessionStorage.getItem(appConstant.ADMIN_APP);
      var admin = JSON.parse(adminString);
      var token = admin ? admin.token : null;
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
        flag = 1;
      }

      return config;
    }

    function addHeaderUser (config) {
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
