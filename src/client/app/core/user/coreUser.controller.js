/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CoreUserController', CoreUserController);

  CoreUserController.$inject = ['$scope', '$state', 'settingService', 'logger', 'localStorageService',
    'appConstant', '$location', '$uibModal', 'coreService', '$anchorScroll', 'ezfb', '$window', '$q'];
  /* @ngInject */
  function CoreUserController($scope, $state, settingService, logger, localStorageService,
                              appConstant, $location, $uibModal, coreService, $anchorScroll, ezfb, $window, $q) {
    var vm = this;

    vm.title = 'Core';

    vm.items = [];

    function runUserApp() {
      settingService.api.getSetting()
        .then(function(response){
          vm.logoUrl = _.get(response, 'data.0.logoUrl');
        })
        .catch(function () {
          vm.logoUrl = '';
        });
    }

    /**
     * get number product in your cart
     * @returns {*|number} number product in your cart
     */
    vm.getNumberProductInCart = function () {
      var YOUR_CART_KEY = appConstant.YOUR_CART;
      var yourCart = localStorageService.get(YOUR_CART_KEY);
      return yourCart ? yourCart.length : 0;
    };

    /**
     * click image go to home page
     */
    vm.goToHomePage = function () {
      $state.go('app.appUser.blog');
    };

    /**
     * set up account
     */
    vm.inforAccount = function() {
      $state.go('app.appUser.userInfo');
    };

    /**
     * check was login or not
     */
    vm.currentUser = coreService.getCurrentUser();

    vm.openYourCard = coreService.openYourCard;

    vm.loginApp = function() {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/core/login/loginDialog.html',
        controller: 'LoginDialogController',
        controllerAs: 'vm',
        size: 'sm'
      });

      modalInstance.result.then(
        function (user) {
          // console.log('user: ', user);
        }, function () {
          //logger.info('Modal dismissed at: ' + new Date());
        });
    };

    /**
     * open menu user name
     */
    vm.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    /**
     * log out
     */
    vm.logout = function() {
      coreService.removeCurrentUser();
      vm.currentUser = {};
    };

    /**
     * go to top page
     */
    vm.goToTop = function goToTop() {
      $location.hash('web-cay-canh-bon-bon-welcome');
      $anchorScroll();
    };

    runUserApp();

    //------------------------------------------------------Facebook

    updateMe();

    updateLoginStatus()
      .then(updateApiCall);

    /**
     * Subscribe to 'auth.statusChange' event to response to login/logout
     */
    ezfb.Event.subscribe('auth.statusChange', function (statusRes) {
      $scope.loginStatus = statusRes;

      updateMe();
      updateApiCall();
    });

    $scope.login = function () {
      /**
       * Calling FB.login with required permissions specified
       * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
       */
      ezfb.login(null, {scope: 'email,user_likes'});

      /**
       * In the case you need to use the callback
       *
       * ezfb.login(function (res) {
     *   // Executes 1
     * }, {scope: 'email,user_likes'})
       * .then(function (res) {
     *   // Executes 2
     * })
       *
       * Note that the `res` result is shared.
       * Changing the `res` in 1 will also change the one in 2
       */
    };

    $scope.logout = function () {
      /**
       * Calling FB.logout
       * https://developers.facebook.com/docs/reference/javascript/FB.logout
       */
      ezfb.logout();

      /**
       * In the case you need to use the callback
       *
       * ezfb.logout(function (res) {
     *   // Executes 1
     * })
       * .then(function (res) {
     *   // Executes 2
     * })
       */
    };

    $scope.share = function () {
      var no = 1,
        callback = function (res) {
          console.log('FB.ui callback execution', no++);
          console.log('response:', res);
        };

      ezfb.ui(
        {
          method: 'feed',
          name: 'angular-easyfb API demo',
          picture: 'http://plnkr.co/img/plunker.png',
          link: 'http://plnkr.co/edit/qclqht?p=preview',
          description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
          ' Facebook integration in AngularJS made easy!' +
          ' Please try it and feel free to give feedbacks.'
        },
        callback
      )
        .then(callback);
    };

    /**
     * For generating better looking JSON results
     */
    var autoToJSON = ['loginStatus', 'apiRes'];
    angular.forEach(autoToJSON, function (varName) {
      $scope.$watch(varName, function (val) {
        $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
      }, true);
    });

    /**
     * Update api('/me') result
     */
    function updateMe () {
      ezfb.getLoginStatus()
        .then(function (res) {
          // res: FB.getLoginStatus response
          // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
          return ezfb.api('/me');
        })
        .then(function (me) {
          // me: FB.api('/me') response
          // https://developers.facebook.com/docs/javascript/reference/FB.api
          $scope.me = me;
        });
    }

    /**
     * Update loginStatus result
     */
    function updateLoginStatus () {
      return ezfb.getLoginStatus()
        .then(function (res) {
          // res: FB.getLoginStatus response
          // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
          $scope.loginStatus = res;
        });
    }

    /**
     * Update demostration api calls result
     */
    function updateApiCall () {
      return $q.all([
        ezfb.api('/me'),
        ezfb.api('/me/likes')
      ])
        .then(function (resList) {
          // Runs after both api calls are done
          // resList[0]: FB.api('/me') response
          // resList[1]: FB.api('/me/likes') response
          $scope.apiRes = resList;
        });

    }
  }
})();
