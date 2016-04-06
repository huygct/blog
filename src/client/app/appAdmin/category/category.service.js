/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.category')
    .factory('categoryService', categoryService);

  categoryService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant'];
  /* @ngInject */
  function categoryService($http, $q, exception, logger, appConstant) {

    var api;
    var service = {};

    function getView() {
      return {
        main: {
          name: 'main',
          urlTpl: appConstant.category.urlTemplates.main
        },
        add: {
          name: 'add',
          urlTpl: appConstant.category.urlTemplates.add
        },
        edit: {
          name: 'edit',
          urlTpl: appConstant.category.urlTemplates.edit
        }
      };
    }

    var cache = {
      currentView: getView().main

    };

    api = {
      getCategoryList: function (url) {
        var defer = $q.defer();

        defer.resolve([
          {
            id: 601,
            name: 'Frozen joghurt',
            description: 'abc'
          },
          {
            id: 602,
            name: 'Ice cream sandwitch',
            description: 'abc'
          }
        ]);

        return defer.promise;

        //return $http.get(coreService.getApi(url));
      }
    };

    service.api = api;
    service.getView = getView();
    service.cache = cache;

    return service;
  }
})();