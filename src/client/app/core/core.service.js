/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('coreService', coreService);

  coreService.$inject = ['$http', 'exception', '$state', 'appConstant', '$rootScope',
    '$uibModal', 'localStorageService', 'ezfb'];
  /* @ngInject */
  function coreService($http, exception, $state, appConstant, $rootScope,
                       $uibModal, localStorageService, ezfb) {
    var service = {};

    /**
     * read env.json
     */
    function getEnv() {
      return $http.get('env.json')
        .then(success)
        .catch(fail);

      function success(response) {
        service.env = response.data;
        return response.data;
      }
      function fail() {
        return exception.catcher('Read env.json fail...');
      }
    }

    function formatApi(api) {
      var config = service.env.server;
      return config.protocol + config.address + (config.port ? ':' + config.port : '') + '/' + api;
    }

    function formatApiUploadImage(api) {
      var config = service.env.serverImage || null;
      if(!config) {
        return api;
      }
      return config.protocol + config.address + (config.port ? ':' + config.port : '') + '/' + api;
    }

    /**
     * save user into localStore
     * @param user
     */
    function saveCurrentUser(user) {
      $rootScope.currentUser = user;
      localStorageService.set(appConstant.USER_APP, user);
    }

    /**
     * get user from localStore
     */
    function getCurrentUser() {
      $rootScope.currentUser = localStorageService.get(appConstant.USER_APP);
      return $rootScope.currentUser;
    }

    /**
     * remove current User
     */
    function removeCurrentUser() {
      $rootScope.currentUser = null;
      localStorageService.remove(appConstant.USER_APP);
    }

    /**
     * upload info user
     */
    function updateInfoUser(newInfo) {
      var currentUser = localStorageService.get(appConstant.USER_APP);
      currentUser.user = newInfo;
      $rootScope.currentUser = currentUser;
      localStorageService.set(appConstant.USER_APP, currentUser);
    }

    /**
     * Api
     */
    var api = {
      addUser: function (user) {
        return $http.post(formatApi(appConstant.core.api.addUser), user);
      },
      login: function(user) {
        return $http.post(formatApi(appConstant.core.api.login), user);
      },
      getInfoFacebookUser: function (facebookId) {
        return $http.post(formatApi(appConstant.core.api.authenticateByFacebook), {facebookID: facebookId});
      }
    };

    /**
     * open your cart to add product or check cart
     */
    function openYourCard(product) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: appConstant.cart.urlTemplates.dialogCart,
        controller: 'CartDialogController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          productForCart: function () {
            return product || {};
          }
        }
      });

      modalInstance.result.then(
        function (productList) {
          var YOUR_CART_KEY = appConstant.YOUR_CART;
          localStorageService.set(YOUR_CART_KEY, productList);
        }, function () {
          //logger.info('Modal dismissed at: ' + new Date());
        });
    }

    /**
     * connect to facebook
     */
    function getInfoFacebookUser(facebookId) {
      api.getInfoFacebookUser(facebookId)
        .then(function (response) {
          if(_.get(response, 'data.length') === 0) {
            // login success with account haven't information yet
            $state.go('app.appUser.userInfo', {mode: 'writeInfo', facebook: 'connected'});
          } else {
            // login success with account was existed information
            saveCurrentUser(response.data);
          }
        })
        .catch(function () {

        })
    }

    /**
     * Update loginStatus result
     */
    function updateLoginStatus (more) {
      ezfb.getLoginStatus(function (res) {
        console.log(res);
        //$scope.loginStatus = res;
        $rootScope.facebook = res.status;
        if(res.status === 'connected') {
          (more || angular.noop)();
        }
      });
    }

    /**
     * Update api('/me') result
     */
    function updateApiMe () {
      ezfb.api('/me?fields=id,name,email,picture', function (res) {
        $rootScope.facebookInfo = res;
        getInfoFacebookUser(res.id);
      });
    }

    function loginByFacebook() {
      /**
       * Calling FB.login with required permissions specified
       * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
       */
      ezfb.login(function (res) {
        /**
         * no manual $scope.$apply, I got that handled
         */
        if (res.authResponse) {
          updateLoginStatus(updateApiMe);
        }
      }, {scope: 'email,user_likes'});
    }

    function logoutFacebook() {
      /**
       * Calling FB.logout
       * https://developers.facebook.com/docs/reference/javascript/FB.logout
       */
      ezfb.logout(function () {
        updateLoginStatus();
      });
    }

    function shareFacebook() {
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
        function (res) {
          // res: FB.ui response
        }
      );
    }

    updateLoginStatus(updateApiMe);
    //logoutFacebook();

    service.api = api;
    service.getEnv = getEnv;
    service.formatApi = formatApi;
    service.formatApiUploadImage = formatApiUploadImage;
    service.saveCurrentUser = saveCurrentUser;
    service.getCurrentUser = getCurrentUser;
    service.removeCurrentUser = removeCurrentUser;
    service.updateInfoUser = updateInfoUser;

    service.openYourCard = openYourCard;

    service.facebook = {};
    service.facebook.loginByFacebook = loginByFacebook;
    service.facebook.logoutFacebook = logoutFacebook;
    service.facebook.shareFacebook = shareFacebook;

    return service;
  }
})();
