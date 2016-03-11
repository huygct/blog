/**
 * Created by thuynghi on 04/03/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.user.blog')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'appUser.blog',
        config: {
          url: '/',
          templateUrl: 'app/appUser/blog/blog.html',
          controller: 'BlogController',
          controllerAs: 'vm',
          title: 'Blog'
        }
      }
    ];
  }
})();
