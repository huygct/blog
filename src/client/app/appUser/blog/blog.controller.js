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

          vm.cache.status = true;
        })
        .catch(function (error) {
          vm.cache.status = false;
        })
        .finally(function () {

        })
    }

    vm.changePage = getProduct;

    function activate() {
      getProduct(vm.defaultValue.currentPage);
      logger.info('Activated Blog View');
    }

    activate();
  }
})();
