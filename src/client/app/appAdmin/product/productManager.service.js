/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .factory('productManagerService', productManagerService);

  productManagerService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', 'coreService'];
  /* @ngInject */
  function productManagerService($http, $q, exception, logger, appConstant, coreService) {

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
      currentView: getView().main

    };

    api = {
      getProductList: function (url) {
        var defer = $q.defer();

        defer.resolve([
          {
            id: 601,
            name: 'Frozen joghurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            id: 602,
            name: 'Ice cream sandwitch',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '84%',
            iron: '1%'
          },
          {
            id: 603,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 24,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
          },
          {
            id: 604,
            name: 'Cupkake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
          },
          {
            id: 605,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 2.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
          },
          {
            id: 606,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
          },
          {
            id: 607,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
          },
          {
            id: 608,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
          },
          {
            id: 609,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
          },
          {
            id: 610,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
          }
        ]);

        return defer.promise;

        //return $http.get(coreService.getApi(url));
      },

      uploadImage: function(url, imageSource) {
        var urlFormat = coreService.formatApi(url);
        //create form data object
        var fd = new FormData();
        fd.append('file', imageSource);
        //send the file / data to your server
        return $http.post(urlFormat, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
      },
      addProduct: function (url, product) {
        return $http.post(coreService.formatApi(url), product);
      },
      editProduct: function (url, product) {
        return $http.put(coreService.formatApi(url), product);
      },
      deleteProduct: function (url, id) {
        return $http.delete(coreService.formatApi(url), id);
      }
    };

    service.api = api;
    service.getView = getView();
    service.cache = cache;

    return service;
  }
})();
