/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.category')
    .factory('categoryService', categoryService);

  categoryService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant',
      'coreService', 'commonService'];
  /* @ngInject */
  function categoryService($http, $q, exception, logger, appConstant,
                           coreService, commonService) {

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
      currentView: getView().main,
      currentCategory: {},
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false
    };

    api = {
      getCategoryList: function () {
        var url = coreService.formatApi(appConstant.category.api.getCategoryList);
        return $http.get(url);
      },
      getCategoryWithPage: function (config) {
        var url = coreService.formatApi(appConstant.category.api.getCategoryWithPage);
        return $http.post(url, config);
      },
      addCategory: function (category) {
        var url = coreService.formatApi(appConstant.category.api.addCategory);
        return $http.post(url, category);
      },
      updateCategory: function (category, id) {
        var url = coreService.formatApi(appConstant.category.api.updateCategory) + '/' + id;
        return $http.put(url, category);
      },
      deleteCategory: function (arrayId) {
        var url = coreService.formatApi(appConstant.category.api.deleteCategory);
        return $http.delete(url, {params: {id: arrayId}});
      }
    };

    service.api = api;
    service.getView = getView();
    service.cache = cache;

    return service;
  }
})();
