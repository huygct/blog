/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$q', '$scope', 'logger', 'productManagerService', 'blogService'];
  /* @ngInject */
  function BlogController($q, $scope, logger, productManagerService, blogService) {
    var vm = this;
    vm.title = 'Blog';

    vm.cache = blogService.cache;
    vm.defaultValue = vm.cache.defaultValue;




    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://lorempixel.com/' + newWidth + '/300',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: currIndex++
      });
    };

    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
      $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
      for (var i = 0, l = slides.length; i < l; i++) {
        slides[i].id = indexes.pop();
      }
    }

    function generateIndexesArray() {
      var indexes = [];
      for (var i = 0; i < currIndex; ++i) {
        indexes[i] = i;
      }
      return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;

      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }

      return array;
    }














    /**
     * get product for per page
     */
    function getProduct(currentPage) {
      var offset = (currentPage - 1) * vm.defaultValue.numberItemOfPage;
      var objPost = {
        offset: offset.toString(),
        limit: vm.defaultValue.numberItemOfPage.toString()
      };
      productManagerService.api.getProductForPage(objPost)
        .then(function (response) {
          vm.productList = response.data;

          vm.cache.status = true;
        })
        .catch(function (error) {
          vm.cache.status = false;
        })
        .finally(function () {

        })
    }

    vm.changePage = getProduct;

    function activate() {
      getProduct(vm.defaultValue.currentPage);
      logger.info('Activated Blog View');
    }

    activate();
  }
})();
