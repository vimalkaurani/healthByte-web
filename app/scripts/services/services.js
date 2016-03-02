/*global define*/
'use strict';

define([
        'app'
    ],

    function(app) {
        app.factory('getPostService', ['$http', '$q', '$log',
            function($http, $q, $log) {
                // interface
                var service = {
                    posts: [],
                    getPosts: getPosts
                };
                return service;


                // implementation
                function getPosts(url) {
                    var def = $q.defer();

                    $http.get(url)
                        .success(function(data) {
                            service.posts = data;
                            def.resolve(data);
                        }).error(function(msg, code) {
                            def.reject(msg);
                            $log.error(msg, code);
                        });
                    return def.promise;
                }



            }]);

        app.factory('getService', ['$http', '$q', '$log',
            function($http, $q, $log) {
                // interface
                var service = {
                    posts: [],
                    get: get
                };
                return service;


                // implementation
                function get(url) {
                    var def = $q.defer();

                    $http.get(url)
                        .success(function(data) {
                            service.posts = data;
                            def.resolve(data);
                        }).error(function(msg, code) {
                            def.reject(msg);
                            $log.error(msg, code);
                        });
                    return def.promise;
                }



            }]);

        app.factory('postService', ['$http', '$q',
            function($http, $q, $log) {
                // interface
                var service = {
                    posts: [],
                    post: post
                };
                return service;


                // implementation
                function post(url,data) {
                    var def = $q.defer();

                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    }).success(function (data) {
                        service.posts = data;
                        def.resolve(data);
                    }).error(function(msg, code) {
                        def.reject(msg);
                    });
                    return def.promise;
                }

            }]);

        app.factory('patchService', ['$http', '$q', '$log',
            function($http, $q, $log) {
                // interface
                var service = {
                    posts: [],
                    post: post
                };
                return service;


                // implementation
                function post(url,data) {
                    var def = $q.defer();

                    $http({
                        method: 'PATCH',
                        url: url,
                        data: $.param(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

        app.factory('deleteService', ['$http', '$q', '$log',
            function($http, $q, $log) {
                // interface
                var service = {
                    posts: [],
                    del: del
                };
                return service;


                // implementation
                function del(url,data) {
                    var def = $q.defer();

                    $http({
                        method: 'DELETE',
                        url: url,
                        data: $.param(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

        app.factory('FitGlobalService', function() {
            return {
                baseUrl : "/api/"
            };
        });

        app.factory('SidebarCount', ['$http', '$q', '$log', 'FitGlobalService',
            function($http, $q, $log, FitGlobalService) {

                return {
                    getSideBarCount: function(practoAccountId){
                        var url =  FitGlobalService.baseUrl+'posts/count?practoAccountId='+practoAccountId;
                        var deferred = $q.defer();
                        $http.get(url)
                            .success(function(data) {
                                deferred.resolve(data);
                            }).error(function(msg, code) {
                                deferred.reject(msg);
                                $log.error(msg, code);
                            });
                        return deferred.promise;

                    }
                };

        }]);

        app.factory('domain', ['$location', function ($location) {

            return {
                    getDomain: function(subdomain){
                        if(subdomain !== '') {
                            var host = $location.host();
                            var url = '';
                            if(host.indexOf("-") !== -1){
                                url = $location.protocol() + '://' + subdomain+host.substring(host.lastIndexOf("-"));
                            }
                            else {
                                url = $location.protocol() + '://' + subdomain+host.substring(host.indexOf("."));
                            }
                            return url;
                        } 
                    }
                };
            
            
        }]);

        app.factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
        function($rootScope,   $browser,   $q,   $exceptionHandler) {
            var deferreds = {},
                methods = {},
                uuid = 0;

            function debounce(fn, delay, invokeApply) {
                var deferred = $q.defer(),
                    promise = deferred.promise,
                    skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                    timeoutId, cleanup,
                    methodId, bouncing = false;

                // check we dont have this method already registered
                angular.forEach(methods, function(value, key) {
                    if(angular.equals(methods[key].fn, fn)) {
                        bouncing = true;
                        methodId = key;
                    }
                });

                // not bouncing, then register new instance
                if(!bouncing) {
                    methodId = uuid++;
                    methods[methodId] = {fn: fn};
                } else {
                    // clear the old timeout
                    deferreds[methods[methodId].timeoutId].reject('bounced');
                    $browser.defer.cancel(methods[methodId].timeoutId);
                }

                var debounced = function() {
                    // actually executing? clean method bank
                    delete methods[methodId];

                    try {
                        deferred.resolve(fn());
                    } catch(e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    }

                    if (!skipApply) $rootScope.$apply();
                };

                timeoutId = $browser.defer(debounced, delay);

                // track id with method
                methods[methodId].timeoutId = timeoutId;

                cleanup = function(reason) {
                    delete deferreds[promise.$$timeoutId];
                };

                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                promise.then(cleanup, cleanup);

                return promise;
            }


            // similar to angular's $timeout cancel
            debounce.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject('canceled');
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };

            return debounce;
        }]);
    });
