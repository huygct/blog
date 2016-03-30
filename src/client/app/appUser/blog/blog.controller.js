/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function BlogController($q, logger) {
    var vm = this;
    vm.title = 'Blog';

    vm.searchDara = '';

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
