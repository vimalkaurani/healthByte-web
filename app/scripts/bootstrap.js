/* jshint ignore:start*/
/*global define*/
'use strict';

require.config({
	baseUrl: '/scripts',
	urlArgs: "v=@hash",
	paths: {
		'angular': '../vendor/angular/angular.min',
		'ngRoute': '../vendor/angular-route/angular-route.min',
		'jquery': '../vendor/jquery/jquery.min',

		'ngCookies'  : '../vendor/angular-cookies/angular-cookies.min',
		'ngResource' : '../vendor/angular-resource/angular-resource.min',
		'ngSanitize' : '../vendor/textAngular/dist/textAngular-sanitize.min',
		'ngTouch'    : '../vendor/angular-touch/angular-touch.min',
		'bootStrap'  : '../style/js/bootstrap.min',

		// From http://angular-ui.github.io/bootstrap/
		// --Boostrap 3 port is still incomplete
		'ngBootstrap' : '../vendor/angular-bootstrap/ui-bootstrap-tpls.min',
		'angular-medium-editor': '../vendor/angular-medium-editor/dist/angular-medium-editor',
		'medium-editor-insert-plugin' : '../vendor/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.all.min'
	},
	shim: {

		'app': {
			deps: ['angular', 'ngRoute', 'bootstrap']
		},

		'jquery': {
			exports: '$'
		},
		'medium-editor': {
			exports: 'medium-editor'
		},

		'angular': {
			exports: 'angular'
		},
		'ngCookies': {
			exports: 'ngCookies',
			deps: ['angular']
		},
		'ngResource': {
			exports: 'ngResource',
			deps: ['angular']
		},
		'ngRoute': {
			exports: 'ngRoute',
			deps: ['angular']
		},
		'ngSanitize': {
			exports: 'ngSanitize',
			deps: ['angular']
		},
		'ngTouch': {
			exports: 'ngTouch',
			deps: ['angular']
		},
		'ngBootstrap': {
			exports: 'ngBootstrap',
			deps: ['angular']
		},
		'angular-medium-editor': {
			exports: 'angular-medium-editor',
			deps: ['angular']
		},
		'medium-editor-insert-plugin': {
			exports: 'medium-editor-insert-plugin',
			deps: ['angular','jquery']
		}

	}
});

require
(
		[
			// Dependencies from lib
			'angular',
			'ngCookies',
			'ngRoute',
			'ngBootstrap',
			'angular-medium-editor',
			'medium-editor-insert-plugin',
			'../style/js/custom',
			'services/services',
			'services/emailService',
			'services/notificationService',
			'services/pollerService',
			'filters/filters',
			'directives/directives',
		],
		function(app)
		{
			angular.bootstrap(document, ['app']);
		}
);
