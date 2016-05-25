/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('coreService', coreService);

  coreService.$inject = ['$http', 'exception', 'logger', 'appConstant', '$rootScope',
    '$uibModal', 'localStorageService'];
  /* @ngInject */
  function coreService($http, exception, logger, appConstant, $rootScope,
                       $uibModal, localStorageService) {
    var service = {};

    /**
     * read env.json
     */
    function getEnv() {
      return $http.get('env.json')
        .then(success)
        .catch(fail);

      function success(response) {
        service.env = response.data;
        return response.data;
      }
      function fail() {
        return exception.catcher('Read env.json fail...');
      }
    }

    function formatApi(api) {
      var config = service.env.server;
      return config.protocol + config.address + (config.port ? ':' + config.port : '') + '/' + api;
    }

    function formatApiUploadImage(api) {
      var config = service.env.serverImage || null;
      if(!config) {
        return api;
      }
      return config.protocol + config.address + (config.port ? ':' + config.port : '') + '/' + api;
    }

    /**
     * save user into localStore
     * @param user
     */
    function saveCurrentUser(user) {
      $rootScope.currentUser = user;
      localStorageService.set(appConstant.USER_APP, user);
    }

    /**
     * get user from localStore
     */
    function getCurrentUser() {
      $rootScope.currentUser = localStorageService.get(appConstant.USER_APP);
      return $rootScope.currentUser;
    }

    /**
     * remove current User
     */
    function removeCurrentUser() {
      $rootScope.currentUser = null;
      localStorageService.remove(appConstant.USER_APP);
    }

    /**
     * upload info user
     */
    function updateInfoUser(newInfo) {
      var currentUser = localStorageService.get(appConstant.USER_APP);
      currentUser.user = newInfo;
      $rootScope.currentUser = currentUser;
      localStorageService.set(appConstant.USER_APP, currentUser);
    }

    /**
     * Api
     */
    var api = {
      addUser: function (user) {
        return $http.post(formatApi(appConstant.core.api.addUser), user);
      },
      login: function(user) {
        return $http.post(formatApi(appConstant.core.api.login), user);
      }
    };

    /**
     * open your cart to add product or check cart
     */
    function openYourCard(product) {

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: appConstant.cart.urlTemplates.dialogCart,
        controller: 'CartDialogController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          productForCart: function () {
            return product || {};
          }
        }
      });

      modalInstance.result.then(
        function (productList) {
          var YOUR_CART_KEY = appConstant.YOUR_CART;
          localStorageService.set(YOUR_CART_KEY, productList);
        }, function () {
          //logger.info('Modal dismissed at: ' + new Date());
        });
    }

    service.api = api;
    service.getEnv = getEnv;
    service.formatApi = formatApi;
    service.formatApiUploadImage = formatApiUploadImage;
    service.saveCurrentUser = saveCurrentUser;
    service.getCurrentUser = getCurrentUser;
    service.removeCurrentUser = removeCurrentUser;
    service.updateInfoUser = updateInfoUser;

    service.openYourCard = openYourCard;

    return service;
  }
})();
