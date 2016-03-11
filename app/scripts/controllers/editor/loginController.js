/*global define*/
'use strict';

define(['angular', 'app'], function(angular, app) {
    app.controller('loginController', function($scope, $location, $http, $cookieStore, $rootScope) {

        $http.get('/api/ulogin').success(function(data) {
            if (typeof $location.search().uid === 'undefined') {
                var myEl = angular.element(document.querySelector('#form'));
                myEl.append(data);
                document.getElementById("openid_message").submit();
            } else {
                $cookieStore.put('practoAccountId', $location.search().uid);
                $location.url('/vallPosts/status/all/page/1');
            }

        });
    });
});
