/*global define*/
'use strict';

define(['angular', 'app'], function(angular, app) {
    app.controller("mediumController", function($scope, $location, $cookies, getService, patchService, postService, $modal, $rootScope, $routeParams, $http) {

        var practoAccountId = $cookies.get('practoAccountId');
        $scope.draftBtn = function() {
            var user_data = {
                'title': $scope.title,
                'content': $scope.content,
                'dateWritten': Date(),
                'datePublished': Date(),
                'imgurl': "practo.com",
                'practoAccountId': practoAccountId,
                'publishedDraft': 'draft',
                'softDeleted': 0
            };

            var url = "/api/posts";
            postService.post(url, user_data)
                .then(function(response) {

                        if (typeof response.error_message !== 'undefined') {
                            $scope.user_msg = response.error_message;

                        } else {
                            $location.path("/vallPosts/status/draft/page/1");
                        }


                    },
                    function(err) {
                        $scope.errorShow = true;
                        $scope.error = err;
                    }
                );

        };

        $scope.publishBtn = function() {

            var user_data = {
                'title': $scope.title,
                'content': $scope.content,
                'dateWritten': Date(),
                'datePublished': Date(),
                'imgurl': "practo.com",
                'practoAccountId': practoAccountId,
                'publishedDraft': 'published',
                'softDeleted': 0
            };


            var url = "/api/posts";
            postService.post(url, user_data)
                .then(function(response) {

                        if (typeof response.error_message !== 'undefined') {
                            $scope.user_msg = response.error_message;

                        } else {
                            $location.path("/vallPosts/status/published/page/1");
                        }


                    },
                    function(err) {
                        $scope.errorShow = true;
                        $scope.error = err;
                    }
                );

        };

        $scope.redirectBtn = function() {
            $location.path("/vallPosts");
        };

    });


});
