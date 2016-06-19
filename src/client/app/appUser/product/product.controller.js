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

    vm.galleries = [];
    if(_.get(vm.currentProduct, 'galleries.length', -1) > 0) {
      _.forEach(vm.currentProduct.galleries, function (image) {
        vm.galleries.push({
          thumb: '/images/thumbs/' + image.name,
          img: image.path,
          description: image.destination
        })
      });
    }
  }
})();
