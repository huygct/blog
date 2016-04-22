/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$q', 'logger', 'productManagerService', 'blogService'];
  /* @ngInject */
  function BlogController($q, logger, productManagerService, blogService) {
    var vm = this;
    vm.title = 'Blog';

    vm.cache = blogService.cache;
    vm.defaultValue = vm.cache.defaultValue;

    /**
     * get product for per page
     */
    function getProduct(currentPage) {
      var offset = (currentPage - 1) * vm.defaultValue.numberItemOfPage;
      var objPost = {
        offset: offset.toString(),
        limit: vm.defaultValue.numberItemOfPage.toString()
      };
      productManagerService.api.getProductForPage(objPost)
        .then(function (response) {
          vm.productList = response.data;
        })
        .catch(function (error) {

        })
        .finally(function () {

        })
    }

    vm.changePage = getProduct;

    //vm.data = [
    //  {
    //    imageUrl: 'https://cdn02.static-adayroi.com/resize/240_240/100/2015/6/13/76730_bn7_139_20150708_hh169_1_chon.jpg',
    //    name: 'SP 1',
    //    cost: 200
    //  },
    //  {
    //    imageUrl: 'images/more-from-1.png',
    //    name: 'SP 1',
    //    cost: 200
    //  }
    //];

    function activate() {
      getProduct(vm.defaultValue.currentPage);
      logger.info('Activated Blog View');
    }

    activate();
  }
})();
