/**
 * Created by thuynghi on 08/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$q', 'dataservice', 'logger', '$scope', 'coreService'];
  /* @ngInject */
  function RegisterController($q, dataservice, logger, $scope, coreService) {
    var vm = this;

    vm.register = function (user) {
      console.log('User: ', user);
      coreService.api.addUser(user)
        .then(function (user) {
          console.log('success : ', user);
        }, function (error) {
          console.log('error');
        })
        .finally(function () {

        });
    }


  }
})();