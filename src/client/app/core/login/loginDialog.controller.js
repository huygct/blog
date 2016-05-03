/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('LoginDialogController', loginDialogController);

  loginDialogController.$inject = ['$state', '$uibModalInstance', 'logger', '$scope', 'coreService'];
  /* @ngInject */
  function loginDialogController($state, $uibModalInstance, logger, $scope, coreService) {
    var vm = this;
    var user;

    vm.msgError = '';

    /**
     * login
     */
    vm.login = function (user) {
      coreService.api.login(user)
        .then(function(response) {
          console.log(response);
          vm.msgError = '';
          $uibModalInstance.close(user);
        })
        .catch(function(error) {
          if(error.status >= 400) {
            vm.msgError = _.get(error, 'data.err');
          }
        });
    };
    /**
     * register
     */
    vm.goToRegister = function () {
      $state.go('app.appUser.register');
      $uibModalInstance.dismiss('cancel');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
