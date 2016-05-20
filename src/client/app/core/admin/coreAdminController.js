/**
 * Created by thuynghi on 04/03/2016.
 */
/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CoreAdminController', CoreAdminController);

  CoreAdminController.$inject = ['$state', '$rootScope', '$window', 'orderManagerService', 'appConstant'];
  /* @ngInject */
  function CoreAdminController($state, $rootScope, $window, orderManagerService, appConstant) {
    var vm = this;

    vm.title = 'Core';

    $rootScope.numberOtherNotDeliver = orderManagerService.cache.numberOtherNotDeliver;

    vm.navigation = [
      {
        state: 'app.appAdmin.dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        selected: $state.is('app.appAdmin.dashboard')
      },
      {
        state: 'app.appAdmin.orderManager',
        name: 'Orders',
        icon: 'shopping_cart',
        selected: $state.is('app.appAdmin.orderManager')
      },
      {
        state: 'app.appAdmin.event',
        name: 'Event',
        icon: 'event',
        selected: $state.is('app.appAdmin.event')
      },
      {
        state: 'app.appAdmin.category',
        name: 'Categories',
        icon: 'book',
        selected: $state.is('app.appAdmin.category')
      },
      {
        state: 'app.appAdmin.productManager',
        name: 'Products',
        icon: 'whatshot',
        selected: $state.is('app.appAdmin.productManager')
      },
      {
        state: 'app.appAdmin.offlineSale',
        name: 'Offline Sale',
        icon: 'accessibility',
        selected: $state.is('app.appAdmin.offlineSale')
      }
    ];

    /**
     * get number other that is not deliver
     */
    function getNumberNotDeliver() {
      orderManagerService.api.getNumberNotDeliver()
        .then(function (response) {
          $rootScope.numberOtherNotDeliver = response.data;
        })
        .catch(function () {
          $rootScope.numberOtherNotDeliver = 0;
        });
    }

    vm.logoutAdmin = function logoutAdmin() {
      $window.sessionStorage.removeItem(appConstant.ADMIN_APP);
      $state.go('app.appUser.blog');
    };

    vm.goToOrder = function goToOrder() {
      $state.go('app.appAdmin.orderManager');
    };

    getNumberNotDeliver();
  }
})();
