/**
 * Created by thuynghi on 02/03/2016.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('formatCurrency', formatCurrency);

  /* @ngInject */
  function formatCurrency () {
    function linkFunc(scope, el, attr, ctrl) {
      if (!ctrl) return;


      ctrl.$formatters.unshift(function (a) {
        return $filter(attrs.format)(ctrl.$modelValue)
      });


      ctrl.$parsers.unshift(function (viewValue) {
        var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
        elem.val($filter(attrs.format)(plainNumber));
        return plainNumber;
      });
    }

    return {
      require: '?ngModel',
      link: linkFunc
    };
  }
})();
