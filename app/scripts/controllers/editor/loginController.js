/*global define*/
'use strict';

define(['angular', 'app'], function(angular, app) {
    app.controller('loginController', function($window, $scope, $location, $http, $cookies, $rootScope) {

        $scope.login = function() {
            $http.get('/api/ulogin').success(function(data) {
                if (typeof $location.search().uid === 'undefined') {
                    var myEl = angular.element(document.querySelector('#form'));
                    myEl.append(data);
                    document.getElementById("openid_message").submit();     
                } else {
                    $cookies.put('practoAccountId', $location.search().uid);
                    $cookies.put('name',$location.search().name);
                    $rootScope.name = $cookies.get('name');
                    $location.url('/vallPosts/status/all/page/1');
                }

            });
        }

        $rootScope.name = $cookies.get('name');
        

        $scope.logout = function(){
            $cookies.remove("practoAccountId");
            $cookies.remove("name");
            $window.location.href="http://accounts-pensieve.practodev.com/logout";
        
        };
    });
});
