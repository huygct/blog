/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$q', 'logger', '$scope'];
  /* @ngInject */
  function ProductController($q, logger, $scope) {
    var vm = this;

    $scope.imagePath = 'https://cdn02.static-adayroi.com/resize/240_240/100/2015/6/13/76730_bn7_139_20150708_hh169_1_chon.jpg';


    function activate() {
      logger.info('Activated Product View');
    }

    activate();
  }
})();
