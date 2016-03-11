/*global define*/
'use strict';

define(['app'], function (app) {

    app.controller("DeletePostController", function ($scope, $routeParams, $location, $rootScope,$http, deleteService, delData, $modalInstance) {

        $scope.delete = function(value) {
            if(value === 'yes')
            {
                
                var url = delData.delUrl;
                var req = {method : 'DELETE',
                 url : url
                 
               };

       $http(req).success( function(response) {
     
            var req = {method : 'GET',
                url : "/api/posts/" + delData.postId
              };

            $http(req).success( function(response) {
                $location.path("/vallPosts/status/" + response['data'][0].publishedDraft +'/page/1');
            });
            
       });

            $modalInstance.dismiss();

            }
            else
            {
                $modalInstance.dismiss('cancel');
            }

        };

    });
});