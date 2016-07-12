/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CoreUserController', CoreUserController);

  CoreUserController.$inject = ['$scope', '$state', 'settingService', 'logger', 'localStorageService',
    'appConstant', '$location', '$uibModal', 'coreService', '$anchorScroll', 'ezfb', '$window', '$q'];
  /* @ngInject */
  function CoreUserController($scope, $state, settingService, logger, localStorageService,
                              appConstant, $location, $uibModal, coreService, $anchorScroll, ezfb, $window, $q) {
    var vm = this;

    vm.title = 'Core';

    vm.items = [];

    function runUserApp() {
      settingService.api.getSetting()
        .then(function(response){
          vm.logoUrl = _.get(response, 'data.0.logoUrl');
        })
        .catch(function () {
          vm.logoUrl = '';
        });
    }

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
     * set up account
     */
    vm.inforAccount = function() {
      $state.go('app.appUser.userInfo');
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
          // console.log('user: ', user);
        }, function () {
          //logger.info('Modal dismissed at: ' + new Date());
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
    vm.logout = function(user) {
      coreService.removeCurrentUser();
      vm.currentUser = {};
      if(user.facebookID) {
        coreService.facebook.logoutFacebook();
      }
    };

    /**
     * go to top page
     */
    vm.goToTop = function goToTop() {
      $location.hash('web-cay-canh-bon-bon-welcome');
      $anchorScroll();
    };

    runUserApp();
  }
})();
