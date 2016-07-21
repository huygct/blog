(function () {
  'use strict';

  angular
    .module('app', [
      'LocalStorageModule',
      'my-compoents',

      'app.core',
      'app.widgets',
      'app.layout',
      'mdDataTable',
      'jkuri.gallery',

      'app.demo',

      'app.admin',
      'app.admin.dashboard',
      'app.admin.product',
      'app.admin.category',
      'app.admin.order',
      'app.admin.event',
      'app.admin.setting',
      'app.admin.upload',
      'app.admin.offlineSale',

      'app.user.blog',
      'app.user.product',
      'app.user.cart',
      'app.user.order',
      'app.user.chat'
    ])

    .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if(_.get(toParams, 'facebook') === 'connected' && toState.name === 'app.appUser.userInfo') {
          return; // login by facebook... access into info user to fill information user
        }
        if(toState.data && !Auth.authorize(toState.data.access)) {
          event.preventDefault();
          $state.go('app.appUser.blog');
        }
      });
    }]);
})();

Number.prototype.formatMoney = function(cc, dd, tt) {
  var n = this,
    c = isNaN(cc = Math.abs(cc)) ? 2 : cc,
    d = dd === undefined ? '.' : dd,
    t = tt === undefined ? ',' : tt,
    s = n < 0 ? '-' : '',
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '') + ' ₫';
};
