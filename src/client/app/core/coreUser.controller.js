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

    vm.openYourCard = function (size) {

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/appUser/cart/dialog/cartDialog.html',
        controller: 'CartDialogController',
        controllerAs: 'vm',
        size: size,
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(
        function (selectedItem) {
          $scope.selected = selectedItem;
          console.log('--- ', selectedItem);
        }, function () {
          logger.info('Modal dismissed at: ' + new Date());
        });
    };

  }
})();
