(function(){
	'use strict';

	angular.module('musicstore.account')
		.controller('AccountController' , ['$rootScope','$scope',
			function($rootScope,$scope){
				$scope.header_message = '';
				console.log($rootScope);
				var init = function(){
					if(!$rootScope.user_logged){
						$scope.header_message = 'Please log in';
					}
					else{
						$scope.header_message = $rootScope.user_firstname + ' ' + $rootScope.user_lastname + ' Account';	
					}
				}
			init();
		}]);
})();