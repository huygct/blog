(function () {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ui.bootstrap',
        'ckeditor',
        'app.core',
        'app.widgets',
        'app.layout',

        'app.demo',

        'app.admin',
        'app.dashboard',

        'app.user.blog',
        'app.user.product'
    ]);

})();
