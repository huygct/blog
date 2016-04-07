(function () {
  'use strict';

  angular
    .module('app.admin.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.title = 'Dashboard';




    activate();

    function activate() {
      logger.info('Activated Dashboard View');
    }
  }
})();
