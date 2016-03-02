/*global define*/
'use strict';

define(['app'], function (app) {
    app.directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function() {
                    $("body").animate({scrollTop: 0}, "slow");
                });
            }
        };
    });

    app.directive('autoScrollTo', ['$location', '$anchorScroll', '$timeout', function ($location, $anchorScroll, $timeout) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, elem, attr) {
                //code to scroll on the basis of provided id
                $timeout(function () {
                    $location.hash(attr.autoScrollTo);
                    $anchorScroll();
                });
            }
        };
    }]);

    app.directive('autoGrow', function() {
      return function(scope, element, attr){
        var update = function(event) {
          element.css('height', element[0].scrollHeight + 'px');
        };

        element.bind('keydown', update);
        update();
      };
    });

});