/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CoreUserController', CoreController);

  CoreController.$inject = ['$scope', '$state', '$http', 'logger', '$location', '$stateParams', '$uibModal'];
  /* @ngInject */
  function CoreController($scope, $state, $http, logger, $location, $stateParams, $uibModal) {
    var vm = this;

    vm.title = 'Core';

    vm.items = [];

    vm.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/appUser/card/card.html',
        controller: 'CardController',
        size: size,
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        logger.info('Modal dismissed at: ' + new Date());
      });
    };

  }
})();
