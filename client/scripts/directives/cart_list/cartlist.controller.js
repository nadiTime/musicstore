(function(){
	'use strict';

	angular.module('musicstore.cartlist')
		.controller('CartlistController' , ['$location','$scope' , '$rootScope' , 'GeneralFactory' , 'CheckoutFactory',
			function($location,$scope,$rootScope,GeneralFactory,CheckoutFactory){

			$scope.cart = [];
			var assets_images = '/musicstore/assets/images/';
			$scope.cart_subtotal = 0;
			$scope.goToCheckout = function(){
				$location.path('/checkout/');
			}
			var init = function(){
				var cart = GeneralFactory.getFromLS('cart');
				console.log(cart);
				if(typeof cart != 'null'){
					var albums_obj = cart.albums;
					CheckoutFactory.getAlbums(albums_obj)
					.then(function(response){
						console.log(response);
						var amount_for_album = 0;
						var i = 0;
						var image_path = 'assets/images/';
						angular.forEach(response,function(album){
							response[i].amount = cart.amount[i];
							response[i].image_path = image_path + response[i].image_path; 
							i++;
							$scope.cart_subtotal += (cart.amount[i]*album.album_price);
						});
						$scope.cart = response;	
					});	
				}
			}		
			init();
		}]);
})();