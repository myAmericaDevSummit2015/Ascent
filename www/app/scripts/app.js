'use strict';

/**
 * @ngdoc overview
 * @name myAmericaApp
 * @description
 * # myAmericaApp
 *
 * Main module of the application.
 */
angular
  .module('myAmericaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-mapbox'
  ])
  .constant('RIDB_API', {
    HOST: 'https://ridb.recreation.gov/api/v1',
    KEY: 'ADD_RIDB_KEY_HERE'
  })
  .constant('SERVER_API', {
    HOST: 'ADD_SERVER_HOST_HERE'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/map', {
        controller: 'MapCtrl'
      })
      .when('/map/:param', {
        controller: 'MapCtrl'
      })
      .when('/park/:parkId', {
        templateUrl: 'views/park.html',
        controller: 'ParkCtrl'
      })
      .when('/reader', {
        templateUrl: 'views/reader.html',
        controller: 'ReaderCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/map'
      });
  });
