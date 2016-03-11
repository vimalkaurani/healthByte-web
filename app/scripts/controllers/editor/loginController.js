/*global define*/
'use strict';

define(['angular','app'], function(angular, app) {
    app.controller('loginController', function($scope, $location, $http, $cookieStore, $rootScope) { 
        $scope.me="hello jnbmnbnbmn";

        $http.get('api/ulogin').success(function(data) {
        	var myEl = angular.element(document.querySelector('#form'));
            myEl.append(data);
            console.log(myEl);
            // document.getElementById("openid_message").submit();
        });
    });
});