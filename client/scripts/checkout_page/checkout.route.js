(function(){
	'use strict';

	angular.module('musicstore.checkout')

	.config(function($routeProvider){
		$routeProvider.when("/checkout",
			{
			  templateUrl: "client/scripts/checkout_page/checkoutView.html",
			  controller: "CheckoutController",
			  controllerAs: "ckc"
			}
		);
	})
})();
