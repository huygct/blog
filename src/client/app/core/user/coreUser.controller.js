/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CoreUserController', CoreUserController);

  CoreUserController.$inject = ['$scope', '$state', '$http', 'logger', 'localStorageService',
    'appConstant', '$stateParams', '$uibModal', 'coreService'];
  /* @ngInject */
  function CoreUserController($scope, $state, $http, logger, localStorageService,
                              appConstant, $stateParams, $uibModal, coreService) {
    var vm = this;

    vm.title = 'Core';

    vm.items = [];

    /**
     * get number product in your cart
     * @returns {*|number} number product in your cart
     */
    vm.getNumberProductInCart = function () {
      var YOUR_CART_KEY = appConstant.YOUR_CART;
      var yourCart = localStorageService.get(YOUR_CART_KEY);
      return yourCart ? yourCart.length : 0;
    };

    /**
     * click image go to home page
     */
    vm.goToHomePage = function () {
      $state.go('app.appUser.blog');
    };

    /**
     * check was login or not
     */
    vm.currentUser = coreService.getCurrentUser();

    vm.openYourCard = coreService.openYourCard;

    vm.loginApp = function() {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/core/login/loginDialog.html',
        controller: 'LoginDialogController',
        controllerAs: 'vm',
        size: 'sm'
      });

      modalInstance.result.then(
        function (user) {
          console.log('user: ', user);
        }, function () {
          logger.info('Modal dismissed at: ' + new Date());
        });
    };

    /**
     * open menu user name
     */
    vm.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    /**
     * log out
     */
    vm.logout = function() {
      coreService.removeCurrentUser();
      vm.currentUser = {};
    }

  }
})();
