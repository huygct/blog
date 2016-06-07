/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$scope', 'productsByCategoryId', 'currentProduct', 'productService',
    'coreService'];
  /* @ngInject */
  function ProductController($scope, productsByCategoryId, currentProduct, productService,
                             coreService) {
    var vm = this;

    vm.cache = productService.cache;
    vm.productsByCategoryId = productsByCategoryId;
    vm.currentProduct = currentProduct;

    vm.openYourCard = coreService.openYourCard;

    $scope.images = [
      {thumb: 'images/thumbs/1.jpg', img: 'images/1.jpg', description: 'Image 1'},
      {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg', description: 'Image 2'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/3.jpg', description: 'Image 3'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/4.jpg', description: 'Image 4'},
      {thumb: 'images/thumbs/1.jpg', img: 'images/1.jpg', description: 'Image 1'},
      {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg', description: 'Image 2'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/3.jpg', description: 'Image 3'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/4.jpg', description: 'Image 4'},
      {thumb: 'images/thumbs/1.jpg', img: 'images/1.jpg', description: 'Image 1'},
      {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg', description: 'Image 2'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/3.jpg', description: 'Image 3'},
      {thumb: 'images/thumbs/3.jpg', img: 'images/4.jpg', description: 'Image 4'}

    ];
  }
})();
