/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$q', 'logger', 'productManagerService'];
  /* @ngInject */
  function BlogController($q, logger, productManagerService) {
    var vm = this;
    vm.title = 'Blog';

    vm.searchDara = '';
    vm.maxSize = 5;
    vm.bigTotalItems = 175;
    vm.bigCurrentPage = 1;


    /**
     * get product
     */
    function getProduct() {
      //var objPost =
      productManagerService.getProductWithPage()
        .then(function (response) {

        })
        .catch(function (error) {

        })
        .finally(function () {

        })
    }

    vm.data = [
      {
        imageUrl: 'https://cdn02.static-adayroi.com/resize/240_240/100/2015/6/13/76730_bn7_139_20150708_hh169_1_chon.jpg',
        name: 'SP 1',
        cost: 200
      },
      {
        imageUrl: 'images/more-from-1.png',
        name: 'SP 1',
        cost: 200
      }
    ];

    function activate() {
      logger.info('Activated Blog View');
    }

    activate();
  }
})();
