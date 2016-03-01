(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;

    function activate() {
      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function () {
        logger.info('Activated Dashboard View');
      });

      activate();
    }
  }
})();
