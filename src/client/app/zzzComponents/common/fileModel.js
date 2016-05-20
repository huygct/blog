/**
 * Created by Knightzoro on 4/15/16.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('fileModel', fileModel);

  /* @ngInject */
  fileModel.$inject = ['$parse'];
  function fileModel ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
        });

        scope.$on('$destroy', function (e) {
          element.unbind('change');
        });
      }
    };
  }
})();