/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$state', '$scope', 'logger', 'productManagerService', 'blogService',
    'eventService', '$location', '$anchorScroll'];
  /* @ngInject */
  function BlogController($state, $scope, logger, productManagerService, blogService,
                          eventService, $location, $anchorScroll) {
    var vm = this;
    vm.title = 'Blog';

    vm.cache = blogService.cache;
    vm.defaultValue = vm.cache.defaultValue;

    vm.myInterval = 4000;
    vm.noWrapSlides = false;
    vm.active = 0;
    vm.events = [];

    /**
     * get event to show on uib-carousel
     */
    function getEvent() {
      eventService.api.getEventList()
        .then(function (response) {
          if(_.get(response, 'data.length') > 0) {
            var index = 0;
            _.forEach(response.data, function (event) {
              if(event.imageUrl) {
                event.index = index++;
                vm.events.push(event);
              }
            })
          }
        })
        .catch(function () {
          vm.events = [];
        })
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

    vm.showProductOfEvent = function (productList, eventId) {
      if(productList.length === 1) { // go to details of one product
        $state.go('app.appUser.product', {productId:productList[0].id, categoryId: productList[0].category});
      } else {
        if(productList.length > 1) { // show list products
          $location.hash('eventId' + eventId);
          $anchorScroll();
        }
      }
    };

    vm.changePage = getProduct;

    function activate() {
      getProduct(vm.defaultValue.currentPage);
      getEvent();
      logger.info('Activated Blog View');
    }

    activate();
  }
})();
