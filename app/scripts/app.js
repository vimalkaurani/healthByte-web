/*global define*/
'use strict';
define(['routes','services/dependencyResolverFor'], function(config, dependencyResolverFor)
{
    var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angular-medium-editor']);

    app.config(
        [
            '$routeProvider',
            '$locationProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            '$httpProvider',

            function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider)
            {
                app.controller = $controllerProvider.register;
                app.directive  = $compileProvider.directive;
                app.filter     = $filterProvider.register;
                app.factory    = $provide.factory;
                app.service    = $provide.service;

                $locationProvider.html5Mode(false);
                $locationProvider.hashPrefix("!");


                if(config.routes !== undefined)
                {
                    angular.forEach(config.routes, function(route, path)
                    {

                        $routeProvider.when(path,
                            {
                                templateUrl:route.templateUrl,
                                resolve:dependencyResolverFor(route.dependencies),
                                access: route.access,
                                nav: route.nav
                            });
                    });
                }

                if(config.defaultRoutePath !== undefined)
                {
                    $routeProvider.otherwise({redirectTo:config.defaultRoutePath});
                }
            }
        ]);

    app.run(
        [
            '$rootScope', '$location', '$http', '$route','$routeParams','$cookieStore',

            function($rootScope, $location, $http, $route, $routeParams, $cookieStore)
            {

            }
        ]);


    return app;
});
