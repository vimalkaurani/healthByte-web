/*global define*/
'use strict';

define([
        'app'
    ],

    function(app) {
        app.factory('Poller', function($http,$q){
               return {
                    poll : function(api){
                        var deferred = $q.defer();
                        $http.get(api).then(function (response) {
                                deferred.resolve(response.data);
                        });
                        return deferred.promise;
                    }

                };
            });
    });
