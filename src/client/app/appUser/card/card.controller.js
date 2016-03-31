/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CardController', CardController);

  CardController.$inject = ['$q', 'logger', '$scope', '$uibModalInstance', 'items'];
  /* @ngInject */
  function CardController($q, logger, $scope, $uibModalInstance, items) {
    var vm = this;

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
