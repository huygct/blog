/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.order')
    .controller('OrderController', orderController);

  orderController.$inject = ['$q', 'logger', '$scope'];
  /* @ngInject */
  function orderController($q, logger, $scope) {
    var vm = this;


    function activate() {
      logger.info('Activated Order View');
    }

    activate();
  }
})();