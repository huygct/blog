(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('progressBar', progressBar);

  /* @ngInject */
  function progressBar () {
    var directive = {
      bindToController: true,
      controller: ProgressBarController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'percent': '=',
        'nameBar': '=?',
        'showName': '=?',
        'showPercent': '=?'
      },
      templateUrl: 'my-compoents/progressBar/progressBar.html',
      link: linkFunc
    };

    function linkFunc(scope, el, attr, ctrl) {

    }

    return directive;
  }

  /* @ngInject */
  ProgressBarController.$inject = [];
  function ProgressBarController() {
    var vm = this;

  }

})();
