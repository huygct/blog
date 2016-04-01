/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .controller('CartDialogController', CartDialogController);

  CartDialogController.$inject = ['$q', 'logger', '$scope', '$uibModalInstance', 'items'];
  /* @ngInject */
  function CartDialogController($q, logger, $scope, $uibModalInstance, items) {
    var vm = this;

    //vm.items = items;
    vm.items = [
      {
        imagePath: 'http://2.bp.blogspot.com/-VlQvRXv05yI/VlwOhF0qJBI/AAAAAAAAQws/KR3RB5LmiRU/s1600/i_hate_you__i_love_you__zoro_x_reader__by_riseagainstevil-d88ovwj.png',
        name: 'Knight Zoro',
        price: 200,
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        quantity: 0,
        shortDescription: 'The titles of Washed Out\'s breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene\'s musical language: feel it. It\'s a simple request, as well...',
        description: ''
      },
      {
        imagePath: 'http://2.bp.blogspot.com/-VlQvRXv05yI/VlwOhF0qJBI/AAAAAAAAQws/KR3RB5LmiRU/s1600/i_hate_you__i_love_you__zoro_x_reader__by_riseagainstevil-d88ovwj.png',
        name: 'Knight Zoro 2',
        price: 200,
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        quantity: 0,
        shortDescription: 'The titles of Washed Out\'s breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene\'s musical language: feel it. It\'s a simple request, as well...',
        description: ''
      },
      {
        imagePath: 'http://2.bp.blogspot.com/-VlQvRXv05yI/VlwOhF0qJBI/AAAAAAAAQws/KR3RB5LmiRU/s1600/i_hate_you__i_love_you__zoro_x_reader__by_riseagainstevil-d88ovwj.png',
        name: 'Knight Zoro 2',
        price: 200,
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        quantity: 0,
        shortDescription: 'The titles of Washed Out\'s breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene\'s musical language: feel it. It\'s a simple request, as well...',
        description: ''
      }
    ];
    vm.selected = {
      item: vm.items[0]
    };

    vm.ok = function () {
      console.log('-- ', vm.selected.item);
      $uibModalInstance.close(vm.selected.item);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
