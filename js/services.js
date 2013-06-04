'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('sotaApp.services', ['ngResource']).
    factory('Summit', function($resource, $http){

        // enable CORS requests
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];

        //return $resource('http://sym2.lamp.local/app_dev.php/sota/summit/list', {}, {
        return $resource('json/summit_data.json', {}, {
            query: {method:'GET', isArray:true}
        });
    });
