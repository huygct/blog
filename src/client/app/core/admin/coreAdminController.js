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

  CoreAdminController.$inject = ['$state', '$http', '$location', '$stateParams'];
  /* @ngInject */
  function CoreAdminController($state, $http, $location, $stateParams) {
    var vm = this;

    vm.title = 'Core';

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
      }
    ];


  }
})();
