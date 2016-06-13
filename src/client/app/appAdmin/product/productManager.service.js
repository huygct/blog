/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .factory('productManagerService', productManagerService);

  productManagerService.$inject = ['$http', 'appConstant', 'coreService',
    'commonService'];
  /* @ngInject */
  function productManagerService($http, appConstant, coreService,
                                 commonService) {

    var api;
    var service = {};

    function getView() {
      return {
        main: {
          name: 'main',
          urlTpl: appConstant.product.urlTemplates.main
        },
        add: {
          name: 'add',
          urlTpl: appConstant.product.urlTemplates.add
        },
        edit: {
          name: 'edit',
          urlTpl: appConstant.product.urlTemplates.edit
        }
      };
    }

    var cache = {
      currentView: getView().main,
      currentProduct: {},
      typeInputImage: '',
      icons: [],
      file: {
        myFile: {},
        imageSource: {},
        loading: false
      },
      descriptionForProduct: null,
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false,
      categoryList: []
    };

    api = {
      getAllProducts: function () {
        var url = coreService.formatApi(appConstant.product.api.model);
        return $http.get(url);
      },
      getProductWithPage: function (config) {
        var url = coreService.formatApi(appConstant.product.api.getProductWithPage);
        return $http.post(url, config);
      },
      getProductForPage: function (config) {
        var url = coreService.formatApi(appConstant.product.api.getProductsForPage);
        return $http.post(url, config);
      },
      addProduct: function (product) {
        var url = coreService.formatApi(appConstant.product.api.model);
        return $http.post(url, product);
      },
      updateProduct: function (product, id) {
        var url = coreService.formatApi(appConstant.product.api.model) + '/' + id;
        return $http.put(url, product);
      },
      deleteProduct: function (ids) {
        var url = coreService.formatApi(appConstant.product.api.model);
        return $http.delete(url, {params: {id: ids}});
      },
      getProductById: function(productId) {
        var url = coreService.formatApi(appConstant.product.api.model) + '/' + productId;
        return $http.get(url);
      },
      getProductByCategoryId: function(categoryId) {
        var url = coreService.formatApi(appConstant.product.api.model) + '?category=' + categoryId;
        return $http.get(url);
      },
      getIconsProduct: function() {
        var url = coreService.formatApi('gallery?type=icon');
        return $http.get(url);
      },
      uploadImage: function(photo) {
        var url = coreService.formatApiUploadImage(appConstant.product.api.uploadImage);
        //create form data object
        var fd = new FormData();
        fd.append('photos', photo);
        //send the file / data to your server
        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
      }
    };

    service.api = api;
    service.getView = getView();
    service.cache = cache;

    return service;
  }
})();
