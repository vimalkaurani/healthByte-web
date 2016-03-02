/*global define*/
'use strict';

define([
        'app'
    ],

    function(app) {
        app.factory('EmailTemplate', ['$http', '$q', '$log',
            function($http, $q, $log) {
                var service = {
                    posts: '',
                    getEmailTemplate: getEmailTemplate
                };
                return service;


                // implementation
                function getEmailTemplate(url) {
                    var def = $q.defer();

                    $http({
                        method: 'GET',
                        url: url,
                        headers: {'Content-Type': 'text/html'},
                    }).success(function (data) {
                        service.posts = data;
                        def.resolve(data);
                    }).error(function(msg, code) {
                        def.reject(msg);
                        $log.error(msg, code);
                    });
                    return def.promise;
                }

        }]);
    });