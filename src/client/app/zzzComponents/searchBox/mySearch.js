/**
 * Created by Nghi Tran on 6/4/2015.
 * create directive mySearch to action search on web
 * input: data for search and action when click button close
 */
'use strict';

(function () {
  angular.module('my-compoents')
    .directive('mySearch', [function () {

      function SearchController () {
        var searchCtrl = this;

        searchCtrl.showInput = false;

        function showInputBox() {
          searchCtrl.showInput = !searchCtrl.showInput;
          console.log(searchCtrl.showInput);
        }

        function close() {
          searchCtrl.showInput = false;
          searchCtrl.ngModel = '';
        }

        searchCtrl.showInputBox = showInputBox;
        searchCtrl.close = close;
      }

      return {
        restrict: 'EA',
        scope: {
          ngModel: '='
        },
        controller: SearchController,
        controllerAs: 'searchCtrl',
        bindToController: true,
        templateUrl: 'app/zzzComponents/searchBox/my-search.html'
      };
    }]);
})();