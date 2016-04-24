/**
 * Created by Knightzoro on 4/23/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.event')
    .factory('eventService', eventService);

  eventService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant',
    'coreService', 'commonService'];
  /* @ngInject */
  function eventService($http, $q, exception, logger, appConstant,
                           coreService, commonService) {

    var api;
    var service = {};

    function getView() {
      return {
        main: {
          name: 'main',
          urlTpl: appConstant.event.urlTemplates.main
        },
        add: {
          name: 'add',
          urlTpl: appConstant.event.urlTemplates.add
        },
        edit: {
          name: 'edit',
          urlTpl: appConstant.event.urlTemplates.edit
        }
      };
    }

    var cache = {
      currentView: getView().main,
      currentEvent: {},
      file: {
        myFile: {},
        imageSource: {},
        loading: false
      },
      productInfo: {
        productList: [],
        productSelectList: []
      },
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false
    };

    api = {
      getEventList: function () {
        var url = coreService.formatApi(appConstant.event.api.model);
        return $http.get(url);
      },
      //getEventWithPage: function (config) {
      //  var url = coreService.formatApi(appConstant.event.api.getEventWithPage);
      //  return $http.post(url, config);
      //},
      addEvent: function (event) {
        var url = coreService.formatApi(appConstant.event.api.model);
        return $http.post(url, event);
      },
      updateEvent: function (event, id) {
        var url = coreService.formatApi(appConstant.event.api.model) + '/' + id;
        return $http.put(url, event);
      },
      deleteEvent: function (id) {
        var url = coreService.formatApi(appConstant.event.api.model) + '/' + id;
        return $http.delete(url);
      }
    };

    service.api = api;
    service.getView = getView();
    service.cache = cache;

    return service;
  }
})();