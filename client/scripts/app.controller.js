(function(){
	'use strict';
	angular.module('musicstore')
		.controller('MusicstoreController',['$rootScope',
			 function($rootScope){
				$rootScope.activeCategory = false;
				$rootScope.user_id = false;
				$rootScope.user_auth = false;
				$rootScope.user_firstname = '';
				$rootScope.user_lastname = '';
				$rootScope.user_email = '';
				$rootScope.user_logged = false;
			 	var	init = function(){
					var user = JSON.parse(localStorage.getItem('ms-user'));
					if(user != null){
						$rootScope.user_id = user.user_id;
						$rootScope.user_auth = user.auth;
						$rootScope.user_firstname = user.firstname;
						$rootScope.user_lastname = user.lastname;
						$rootScope.user_email = user.email;
						$rootScope.user_logged = user.user_logged;
					}
				}
				init();
		}]);
})();