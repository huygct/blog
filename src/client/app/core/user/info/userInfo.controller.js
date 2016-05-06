/**
 * Created by thuynghi on 06/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['$q', 'dataservice', 'logger', '$scope', 'coreService', '$state'];
  /* @ngInject */
  function UserInfoController($q, dataservice, logger, $scope, coreService, $state) {
    var vm = this;


  }
})();