/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.category')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'appAdmin.category',
        config: {
          url: '/admin/category',
          templateUrl: 'app/appAdmin/category/category.html',
          controller: 'CategoryController',
          controllerAs: 'vm',
          title: 'Category Manager'
        }
      }
    ];
  }
})();
