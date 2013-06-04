'use strict';

/* Filters */

angular.module('sotaApp.filters', []).
    filter('exactAssCodeMatch', function() {
        return function(input, valueToMatch) {
            if (valueToMatch == null)
                return  input;
            var validList = [];
            for (var i=0; i<input.length; i++) {
                if (input[i].region.association.code === valueToMatch) {
                    validList.push(input[i]);
                }
            }
            return validList;
        };
  })
    .filter('exactRegCodeMatch', function() {
    return function(input, valueToMatch) {
        if (valueToMatch == null)
            return  input;
        var validList = [];
        for (var i=0; i<input.length; i++) {
            if (input[i].region.code === valueToMatch) {
                validList.push(input[i]);
            }
        }
        return validList;
    };
});
