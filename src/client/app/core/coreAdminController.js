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
    .controller('CoreAdminController', CoreController);

  CoreController.$inject = ['$state', '$http', '$location', '$stateParams'];
  /* @ngInject */
  function CoreController($state, $http, $location, $stateParams) {
    var vm = this;

    vm.title = 'Core';
    //console.log(permission, $state.current)

    vm.navigation = [
      {
        state: 'appAdmin.dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        selected: $state.is('appAdmin.dashboard')
      },
      {
        state: 'appAdmin.orderManager',
        name: 'Orders',
        icon: 'shopping_cart',
        selected: $state.is('appAdmin.orderManager')
      },
      {
        state: 'appAdmin.category',
        name: 'Categories',
        icon: 'book',
        selected: $state.is('appAdmin.category')
      },
      {
        state: 'appAdmin.productManager',
        name: 'Products',
        icon: 'whatshot',
        selected: $state.is('appAdmin.productManager')
      }
    ];


  }
})();
