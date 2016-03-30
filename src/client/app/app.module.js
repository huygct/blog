(function () {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ui.bootstrap',
        'ckeditor',
        'app.core',
        'app.widgets',
        'app.admin',
        'app.demo',
        'app.dashboard',
        'app.layout',

        'app.user.blog',
        'app.user.product'
    ]);

})();
