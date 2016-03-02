/* jshint ignore:start */
angular.module('angular-preload-image', []);
angular.module('angular-preload-image').factory('preLoader', function(){
    return function (url, successCallback, errorCallback) {
        angular.element(new Image()).bind('load', function(){
            successCallback();
        }).bind('error', function(){
            errorCallback();
        }).attr('src', url);
    }
});
angular.module('angular-preload-image').directive('preloadImage', ['preLoader', function(preLoader){
    return {
        restrict: 'A',
        terminal: true,
        priority: 100,
        link: function(scope, element, attrs) {
            var url = attrs.ngSrc;
            scope.default = attrs.defaultImage;
            attrs.$set('src', scope.default);
            preLoader(url, function(){
                attrs.$set('src', url);
            }, function(){
                if (attrs.fallbackImage != undefined) {
                    attrs.$set('src', attrs.fallbackImage);
                }
            });
        }
    };
}]);
angular.module('angular-preload-image').directive('preloadBgImage', ['preLoader', function(preLoader){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.preloadBgImage != undefined) {
                //Define default image
                scope.default = attrs.defaultImage;
                element.css({
                    'background-image': 'url("' + scope.default + '")'
                });
                preLoader(attrs.preloadBgImage, function(){
                    element.css({
                        'background-image': 'url("' + attrs.preloadBgImage + '")'
                    });
                }, function(){
                    if (attrs.fallbackImage != undefined) {
                        element.css({
                            'background-image': 'url("' + attrs.fallbackImage + '")'
                        });
                    }
                });
            }
        }
    };
}]);