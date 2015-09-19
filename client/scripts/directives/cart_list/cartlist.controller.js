(function(){
	'use strict';

	angular.module('musicstore.cartlist')
		.controller('CartlistController' , ['$scope' , '$rootScope' , 'GeneralFactory' , 'CheckoutFactory',
			function($scope,$rootScope,GeneralFactory,CheckoutFactory){

			$scope.cart = [];
			var assets_images = '/musicstore/assets/images/';

			var init = function(){
				var cart = GeneralFactory.getFromLS('cart');
				var albums_obj = cart.albums;
				CheckoutFactory.getAlbums(albums_obj)
					.then(function(response){
						$scope.cart.push(response);		
					});
					
				}
					
			init();
		}]);
})();