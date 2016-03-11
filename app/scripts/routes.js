/*global define*/
'use strict';
define([], function()
{
    return {
        // defaultRoutePath: '/login',
        routes: {

            '/login':{
                templateUrl: 'views/editor/login.html',
                dependencies: [
                    'controllers/editor/loginController'
                ],
                access: {
                    requiresAuth: false,
                    requiredPermissions: ''
                },
                nav: {
                    label: "Login"
                }
            },

            '/vallPosts/status/:status/page/:pageno': {
                templateUrl: 'views/editor/list.html',
                dependencies: [
                    'controllers/editor/listController'
                ],
                access: {
                  requiresAuth: false,
                  requiredPermissions: 'DOCTOR'
                },
                nav: {
                    label: "List Page"
                }
            },

            
            '/editor': {
                templateUrl: 'views/editor/editormainpage.html',
                dependencies: [
                    'controllers/editor/editorController'
                ],
                access: {
                  requiresAuth: false,
                  requiredPermissions: 'DOCTOR'
                },
                nav: {
                    label: "Editor Page"
                }
            },
            '/editor/:id': {
                templateUrl: 'views/editor/editPost.html',
                dependencies: [
                    'controllers/editor/editPostController',
                    'controllers/editor/deletePostController'
                ],
                access: {
                  requiresAuth: false,
                  requiredPermissions: 'DOCTOR'
                },
                nav: {
                    label: "Edit Post Page"
                }
            },
            
        }
    };
});
