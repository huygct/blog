/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('LoginDialogController', loginDialogController);

  loginDialogController.$inject = ['$state', '$uibModalInstance', 'logger', '$scope'];
  /* @ngInject */
  function loginDialogController($state, $uibModalInstance, logger, $scope) {
    var vm = this;
    var user;

    /**
     * login
     */
    vm.login = function () {
      $uibModalInstance.close(user);
    };
    /**
     * register
     */
    vm.goToRegister = function () {
      $state.go('appUser.register');
      $uibModalInstance.dismiss('cancel');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();