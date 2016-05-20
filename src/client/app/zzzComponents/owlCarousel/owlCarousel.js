(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('owlCarousel', owlCarousel)
    .directive('owlCarouselItem', owlCarouselItem);

  /* @ngInject */
  function owlCarousel () {
    return {
      transclude: false,
      link: linkFunc,
      restrict: 'EA'
    };

    function linkFunc(scope) {
      scope.initCarousel = function(element) {
        // provide any default options you want
        var defaultOptions = {
          loop:true,
          margin:10,
          responsiveClass:true,
          responsive:{
            0:{
              items:1,
              nav:true
            },
            600:{
              items:3,
              nav:false
            },
            1000:{
              items:5,
              nav:true,
              loop:false
            }
          }
        };
        var customOptions = scope.$eval($(element).attr('data-options'));
        // combine the two options objects
        for(var key in customOptions) {
          defaultOptions[key] = customOptions[key];
        }
        // init carousel
        $(element).owlCarousel(defaultOptions);
      };
    }
  }

  function owlCarouselItem () {
    return {
      transclude: false,
      link: linkFunc,
      restrict: 'EA'
    };

    function linkFunc(scope, element) {
      // wait for the last item in the ng-repeat then call init
      if(scope.$last) {
        scope.initCarousel(element.parent());
      }
    }
  }
})();
