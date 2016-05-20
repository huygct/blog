/**
 * Created by thuynghi on 11/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('my-compoents')
    .component('titleBox', {
      bindings: {
        title: '<',
        items: '<'
      },
      template:  '<div class=\"header-title-box\">' +
                    '<div class=\"arrow-include-title\"><span>{{$ctrl.title}}</span></div>' +
                    '<div class=\"item-list\" ng-if="items"><a ng-repeat="item in $ctrl.items">{{item.name}}</a></div>' +
                  '</div>',
      controller: ['$scope', function ($scope) {
        var $ctrl = this;


      }]
    });

})();