/*global define*/
'use strict';

define([
        'app'
    ],

    function(app) {
        app.factory('getNotificationService', ['$http', '$q',
            function($http, $q) {
                // interface
                var service = {
                    notifications: [],
                    getNotifications: getNotifications
                };
                return service;


                // implementation
                function getNotifications(url) {
                    var def = $q.defer();

                    $http.get(url)
                        .success(function(data) {
                            service.notifications = data;
                            def.resolve(data);
                        })
                        .error(function() {
                            def.reject("Failed to get notifications");
                        });
                    return def.promise;
                }
            }]);

        app.factory('patchNotificationService', ['$http', '$q',
            function($http, $q) {
                // interface
                var service = {
                    notifications: [],
                    patchNotifications: patchNotifications
                };
                return service;

                // implementation
                function patchNotifications(url,data) {
                    var def = $q.defer();

                    $http({
                        method: 'PATCH',
                        url: url,
                        data: $.param(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    }).success(function (response) {
                        service.notifications = response;
                        def.resolve(data);
                    }).error(function() {
                        def.reject("Failed to get notifications");
                    });
                    return def.promise;
                }
            }]);



    });
