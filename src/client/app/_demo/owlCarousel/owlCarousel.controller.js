(function () {
  'use strict';

  angular
    .module('app.demo')
    .controller('OwlCarouselController', OwlCarouselController);

  OwlCarouselController.$inject = ['logger', '$scope'];
  /* @ngInject */
  function OwlCarouselController(logger, $scope) {
    var vm = this;
    vm.title = 'Demo';

    $scope.items1 = [1,2,3,4,5,6,7,8,9,10];
    $scope.items2 = [1,2,3,4,5,6,7,8,9,10];

    $scope.tabs = [
      {title: 'Tab1', urlTemplate: 'app/_demo/owlCarousel/tab1/tab1.html'},
      {title: 'Tab2', urlTemplate: 'app/_demo/owlCarousel/tab2/tab2.html'}
    ];
    $scope.selectedIndex = 0;


    activate();

    function activate() {
      logger.info('Activated Demo View');
    }
  }
})();