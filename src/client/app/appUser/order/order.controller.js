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

    vm.typeBuyer = 'member';
    vm.user = {};
    vm.buyer = {};
    vm.views = {
      affirmation: 'app/appUser/order/templateUrl/affirmation.step1.html',
      informationShipping: 'app/appUser/order/templateUrl/information.shipping.step2.html'
    };

    vm.currentView = vm.views.affirmation;


    vm.items = [
      {
        quantity: 2,
        name: 'zoro',
        price: 200
      },
      {
        quantity: 1,
        name: 'luffy',
        price: 250
      }
    ];

    vm.authenticate = function() {
      console.log('aaaa');
    };


    function activate() {
      logger.info('Activated Order View');
    }

    activate();
  }
})();