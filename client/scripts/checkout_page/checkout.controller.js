(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.controller('CheckoutController' , ['$scope' , '$rootScope' , 'CheckoutFactory' , 'GeneralFactory' ,
			function($scope,$rootScope,CheckoutFactory,GeneralFactory){

				var init = function(){
					var al = GeneralFactory.getFromLS();
					var user_id = $rootScope.user_id;
					var user_auth = $rootScope.user_auth;
					var amount = [3,5];
					var albums = 
				}; 
		}]);
})();