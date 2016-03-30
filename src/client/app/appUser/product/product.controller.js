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

    vm.quantity = 1;
    vm.number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    vm.product = {
      imagePath: 'http://2.bp.blogspot.com/-VlQvRXv05yI/VlwOhF0qJBI/AAAAAAAAQws/KR3RB5LmiRU/s1600/i_hate_you__i_love_you__zoro_x_reader__by_riseagainstevil-d88ovwj.png',
      name: 'Knight Zoro',
      price: 200,
      shortDescription: 'The titles of Washed Out\'s breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene\'s musical language: feel it. It\'s a simple request, as well...',
      description: ''
    };


    function activate() {
      logger.info('Activated Product View');
    }

    activate();
  }
})();
