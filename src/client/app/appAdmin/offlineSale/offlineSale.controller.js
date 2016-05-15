/**
 * Created by Huy Nghi on 5/15/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.setting')
    .controller('OfflineSaleController', OfflineSaleController);

  OfflineSaleController.$inject = ['$rootScope', '$scope', 'offlineSaleService'];
  function OfflineSaleController($rootScope, $scope, offlineSaleService) {
    $rootScope.nameApp = 'Offline Sale';

    var vm = this;

    vm.cache = offlineSaleService.cache;

    $scope.vegetables = ['Corn' ,'Onions' ,'Kale' ,'Arugula' ,'Peas', 'Zucchini'];
    $scope.searchTerm;
    $scope.clearSearchTerm = function() {
      $scope.searchTerm = '';
    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
//    $element.find('input').on('keydown', function(ev) {
//      ev.stopPropagation();
//    });

    vm.backToListOrderView = function() {
      vm.cache.currentView = offlineSaleService.getView.main;
      vm.cache.currentOfflineSale = {};
    };

    vm.goToAddOrderView = function goToAddOrderView() {
      vm.cache.currentView = offlineSaleService.getView.add;
      vm.cache.currentOfflineSale = {};
    };

    vm.goToEditOrderView = function goToEditOrderView(currentOfflineSale) {
      vm.cache.currentView = offlineSaleService.getView.edit;
      vm.cache.currentOfflineSale = currentOfflineSale;
    };

  }

})();
