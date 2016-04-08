/**
 * Created by thuynghi on 08/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$q', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function RegisterController($q, dataservice, logger, $scope) {
    var vm = this;

    vm.register = function (user) {
      console.log('User: ', user);
    }


  }
})();