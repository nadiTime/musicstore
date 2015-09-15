(function(){
	'use strict';

	angular.module('musicstore.wishlist')
		.controller('WishlistController' , ['$scope' , 'GeneralFactory' , 'WishlistFactory' ,
			function($scope,GeneralFactory,WishlistFactory){
				$scope.wishlist = [];
				var init = function(){
				var assets_images = '/musicstore/assets/images/';
				var arr = GeneralFactory.getFromLS('wishlist');
				if( arr.length > 0){
					WishlistFactory.getWishlist(arr)
					.then(function(res_albums_obj){
						angular.forEach(res_albums_obj , function(album){
							album.image_path = assets_images.concat(album.image_path);
							$scope.wishlist.push(album);
						});
					});
				}
				else{
					//display page for empty wishlist
				}
			}
			init();
		}]);
})();