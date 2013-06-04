'use strict';


// Declare app level module which depends on filters, and services
angular.module('sotaApp', ['sotaApp.filters', 'sotaApp.services', 'sotaApp.directives', 'sotaApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/summitList.html', controller: 'SummitCtrl'});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);
