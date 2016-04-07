/**
 * Created by thuynghi on 02/03/2016.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('formatCurrency', formatCurrency);

  /* @ngInject */
  formatCurrency.$inject = [];
  function formatCurrency () {
    function linkFunc(scope, elem, attrs, ctrl) {
      if (!ctrl) return;

      /**
       * Formatters change how model values will appear in the view.
       */
      ctrl.$formatters.unshift(function (value) {
        return formatNumber(value);
      });

      /**
       * Parsers change how view values will be saved in the model.
       */
      ctrl.$parsers.unshift(function (viewValue) {
        var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
        elem.val(formatNumber(plainNumber));
        return plainNumber;
      });

      function formatNumber(newValue) {
        if (!newValue || newValue === '') {
          console.log('www');
          return '';
        }
        if (angular.isNumber(newValue)) {
          newValue = newValue.toString();
        }
        //clearing left side zeros
        while (newValue.charAt(0) == '0') {
          newValue = newValue.substr(1);
        }
        //newValue = newValue.replace(/[^\d.\',']/g, '');

        var point = newValue.indexOf(".");
        if (point >= 0) {
          newValue = newValue.slice(0, point + 3);
        }

        var decimalSplit = newValue.split(".");
        var intPart = decimalSplit[0];
        var decPart = decimalSplit[1];

        intPart = intPart.replace(/[^\d]/g, '');
        if (intPart.length > 3) {
          var intDiv = Math.floor(intPart.length / 3);
          while (intDiv > 0) {
            var lastComma = intPart.indexOf(",");
            if (lastComma < 0) {
              lastComma = intPart.length;
            }

            if (lastComma - 3 > 0) {
              intPart = intPart.slice(0, lastComma - 3) + ',' + intPart.slice(lastComma - 3);
            }
            intDiv--;
          }
        }

        if (decPart === undefined) {
          decPart = "";
        }
        else {
          decPart = "." + decPart;
        }
        return intPart + decPart;
      }
    }

    return {
      require: 'ngModel',
      link: linkFunc
    };
  }
})();
