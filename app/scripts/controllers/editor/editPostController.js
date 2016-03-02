/*global define*/
'use strict';

define(['angular', 'app'], function (angular, app){

 app.controller('editPostController', function($scope, $route, $routeParams,$modal, $location,$http) {

     $scope.route = $routeParams.id;

     $scope.editPosts = function () {

       var req = {
                  method : 'GET',
                 url : '/api/posts/'+$scope.route,
                 headers: {'Content-Type': undefined}
               };

       $http(req).success( function(response) {
         $scope.title = response[0].title;
         $scope.content = response[0].content;
         $scope.publishedStatus = response[0].publishedDraft;
         $scope.softDeleted=response[0].softDeleted;
         console.log($scope.publishedStatus);
       });
     };

     $scope.editBtn = function () {
       $scope.edit_title = $scope.title;
       $scope.edit_content = $scope.content;
       var post_data = {'title': $scope.edit_title,
                       'content': $scope.edit_content};
       var req = {method : 'PATCH',
                 url : '/api/posts/'+$scope.route,
                 data : post_data
               };

       $http(req).success( function(response) {
              var req = {method : 'GET',
                url : "/api/posts/" + $scope.route
              };

            $http(req).success( function(response) {
                $location.path("/vallPosts/status/" + response[0].publishedDraft +'/page/1');
            });
       });
     };

     $scope.publishBtn = function () {
       $scope.edit_title = $scope.title;
       $scope.edit_content = $scope.content;
       var post_data = {'title': $scope.edit_title,
                       'content': $scope.edit_content,
                       'publishedDraft': 'published' };
       var req = {method : 'PATCH',
                 url : '/api/posts/'+$scope.route,
                 data : post_data
               };

       $http(req).success( function(response) {
              var req = {method : 'GET',
                url : "/api/posts/" + $scope.route
              };

            $http(req).success( function(response) {
                $location.path("/vallPosts/status/" + response[0].publishedDraft +'/page/1');
            });
       });
     };


     $scope.deletePost = function () {
          
         var delUrl = "/api/posts/"+$scope.route;
         var delData = {'postId': $scope.route, 'delUrl': delUrl};
         $modal.open({
             controller: 'DeletePostController',
             templateUrl: '/views/modals/editorDeleteModal.html',
             resolve: {
                 delData: function () {
                     return delData;
                 }
             }
         }).result.then(
                
                    );
     };

      $scope.saveAsDraft = function () {
       $scope.edit_title = $scope.title;
       $scope.edit_content = $scope.content;
       var post_data = {'title': $scope.edit_title,
                       'content': $scope.edit_content,
                       'publishedDraft': 'draft',
                       'softDeleted' : 0};
       var req = {method : 'PATCH',
                 url : '/api/posts/'+$scope.route,
                 data : post_data
               };

       $http(req).success( function(response) {
              var req = {method : 'GET',
                url : "/api/posts/" + $scope.route
              };

            $http(req).success( function(response) {
                $location.path("/vallPosts/status/draft/page/1");
            });
       });
     };


 });
});
