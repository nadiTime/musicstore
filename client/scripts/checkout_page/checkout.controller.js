(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.controller('CheckoutController' , ['$scope' , '$rootScope' , 'GeneralFactory' ,
			function($scope,$rootScope,GeneralFactory){

				var init = function(){
					var cart = GeneralFactory.getFromLS('cart');
					console.log(cart);

				}; 
				init();
		}]);
})();