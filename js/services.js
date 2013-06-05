'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('sotaApp.services', ['ngResource']).
    factory('Summit', function($resource, $http){

        // enable CORS requests
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
        return $resource('http://sym2.lamp.local/app_dev.php/sota/summit/list/:assCode', {}, {
        //return $resource('json/:assCode.json', {}, {
            query: {method:'GET', isArray:true}
        });
    })
    .factory('Association', function($resource, $http){

        // enable CORS requests
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource('http://sym2.lamp.local/app_dev.php/sota/association/list', {}, {
        //return $resource('json/association.json', {}, {
            query: {method:'GET', isArray:true}
        });
    })
    .factory('Region', function($resource, $http){

        // enable CORS requests
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource('http://sym2.lamp.local/app_dev.php/sota/region/list', {}, {
        //return $resource('json/region.json', {}, {
            query: {method:'GET', isArray:true}
        });
    });
