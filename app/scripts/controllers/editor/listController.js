/*global define*/
'use strict';


define(['angular', 'app'], function (angular, app) {

  app.controller("listController", function
   ($scope, $location, FitGlobalService, getService, patchService, $modal, $rootScope, $routeParams, $http) {
    
    function getAllPost(url) {
      var req = {method : 'GET',
                url : url
              };

      $http(req).success( function(response) {
      $scope.posts = response;
      });
    }

    $scope.pageno = $routeParams.pageno;
    if($routeParams.status==='draft' ){
      $scope.url =  '/api/posts?publishedDraft=draft&pageno=' + $scope.pageno;
      $scope.postlabel='Drafts';

    }
    else if($routeParams.status==='published'){
      $scope.url =  '/api/posts?publishedDraft=published&pageno=' + $scope.pageno;
      $scope.postlabel= 'Published Posts'
    }
      else if($routeParams.status==='deleted'){
      $scope.url =  '/api/posts?deleted=true'+ '&pageno=' + $scope.pageno;
      $scope.postlabel='Deleted Posts';
    }
    else{
      $scope.url='/api/posts?pageno=' + $scope.pageno;
      $scope.postlabel='All Current Posts'; 
    }



    getAllPost($scope.url);


    $scope.prevPage = function () {
       
       $scope.targetpage = parseInt($scope.pageno)-1;
       $location.path('/vallPosts/status/'+$routeParams.status+'/page/'+ $scope.targetpage);
      
    };

    $scope.nextPage = function () {
      $scope.targetpage = parseInt($scope.pageno)+1;
      $location.path('/vallPosts/status/'+$routeParams.status+'/page/'+$scope.targetpage);
      
    };
    

    $scope.showAllPosts = function(){
      
      $location.path('/vallPosts/status/all/page/1');
    };
    $scope.showDraftsBtn = function () {
     
      $location.path('/vallPosts/status/draft/page/1');
    };

    $scope.showPublishedBtn = function () {

    
      $location.path('/vallPosts/status/published/page/1');
    };

    $scope.showDeletedBtn = function () {
     
       $location.path('/vallPosts/status/deleted/page/1');
    };

    $scope.newPost = function(){
        
        $location.path("/editor");
    };

    
  });
});
