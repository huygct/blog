/**
 * Created by Huy Nghi on 4/18/2016.
 *
 * options: {
 *    type: danger || success
 *    closeFunc()
 * }
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .component('myAlert', {
      bindings: {
        type: '=',
        show: '=',
        msg: '='
      },
      templateUrl: 'myComponents/common/templates/alert.html',
      controller: ['$timeout', '$scope', function($timeout, $scope) {
        var $ctrl = this;

        $scope.$watch('$ctrl.show', function(){
          if($ctrl.show && $ctrl.type === 'success') {
            $timeout(function () {
              if($ctrl.show) {
                $ctrl.closeAlert();
              }
            }, parseInt(4000, 10));
          }
        });

        $ctrl.closeAlert = function () {
          $ctrl.show = false;
        };
      }]
    });
})();

