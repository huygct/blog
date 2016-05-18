/**
 * Created by thuynghi on 16/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('my-compoents')
    .component('numberSpinner', {
      bindings: {
        value: '=',
        config: '<'
      },
      template:  '<div class=\"number-spinner-component\"><div class=\"input-group number-spinner\">' +
                    '<span class=\"input-group-btn data-dwn\">' +
                        '<button class=\"btn btn-default btn-info\" ng-click=\"$ctrl.minusValue()\" ng-disabled=\"$ctrl.disableMinus\">' +
                          '<span class=\"glyphicon glyphicon-minus\">' +
                          '</span>' +
                        '</button>' +
                    '</span>' +
                    '<input type=\"text\" class=\"form-control text-center\" ng-model=\"$ctrl.value\" min=\"$ctrl.config.min\" max=\"$ctrl.config.max\">' +
                    '<span class=\"input-group-btn data-up\">' +
                        '<button class=\"btn btn-default btn-info\" ng-click=\"$ctrl.plusValue()\" ng-disabled=\"$ctrl.disablePlus\">' +
                          '<span class=\"glyphicon glyphicon-plus\">' +
                          '</span>' +
                        '</button>' +
                    '</span>' +
                  '</div></div>',

      controller: ['$scope', function ($scope) {
        var $ctrl = this;

        if(!$ctrl.value) {
          $ctrl.value = 1;
        }

        var defaultConfig = {
          min: 0,
          max: 999
        };

        if($ctrl.config) {
          $ctrl.config = angular.extend($ctrl.config, defaultConfig);
          if($ctrl.value > $ctrl.config.max) {
            $ctrl.value = $ctrl.config.max;
            $ctrl.disablePlus = true;
          }
          if($ctrl.value < $ctrl.config.min) {
            $ctrl.value = $ctrl.config.min;
            $ctrl.disableMinus = true;
          }
        }

        function checkDisableButton(value) {
          if(value < $ctrl.config.min) {
            $ctrl.disableMinus = true;
            $ctrl.disablePlus = false;
          } else {
            if(value > $ctrl.config.max) {
              $ctrl.disableMinus = false;
              $ctrl.disablePlus = true;
            } else {
              $ctrl.disableMinus = false;
              $ctrl.disablePlus = false;
              $ctrl.value = value;
            }
          }
        }

        $ctrl.plusValue = function plusValue() {
          var newValue = $ctrl.value + 1;
          checkDisableButton(newValue);
        };

        $ctrl.minusValue = function minusValue() {
          var newValue = $ctrl.value - 1;
          checkDisableButton(newValue);
        };

      }]
    });

})();