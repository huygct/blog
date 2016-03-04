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

    activate();

    function activate() {
      logger.info('Activated Blog View');
    }
  }
})();
