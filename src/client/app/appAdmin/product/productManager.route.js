/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'appAdmin.productManager',
        config: {
          url: '/productManager',
          templateUrl: 'app/appAdmin/product/productManager.html',
          controller: 'ProductManagerController',
          controllerAs: 'vm',
          title: 'Product Manager',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }
})();
