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

  }
})();
