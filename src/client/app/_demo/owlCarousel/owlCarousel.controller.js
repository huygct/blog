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

    $scope.loading = true;
    $scope.money = 123456;

    var a = 123456789;
    console.log('--- : ', a.formatMoney(0, '.', ','));
    console.log('xxxxx : ', a);

    $scope.items1 = [1,2,3,4,5,6,7,8,9,10];
    $scope.items2 = [1,2,3,4,5,6,7,8,9,10];

    $scope.tabs = [
      {title: 'Tab1', urlTemplate: 'app/_demo/owlCarousel/tab1/tab1.html'},
      {title: 'Tab2', urlTemplate: 'app/_demo/owlCarousel/tab2/tab2.html'}
    ];
    $scope.selectedIndex = 0;

    $scope.images = [
      {thumb: 'images/thumbs/1.jpg', img: 'images/1.jpg', description: 'Image 1'},
      {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg', description: 'Image 2'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/3.jpg', description: 'Image 3'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/4.jpg', description: 'Image 4'}
    ];


    activate();

    function activate() {
      logger.info('Activated Demo View');
    }
  }
})();