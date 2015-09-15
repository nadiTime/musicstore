(function(){
	'use strict';

	angular.module('musicstore.wishlist')
		.controller('WishlistController' , ['$scope' , 'GeneralFactory' , 'WishlistFactory' ,
			function($scope,GeneralFactory,WishlistFactory){
				$scope.wishlist = [];

				var init = function(){
					var assets_images = '/musicstore/assets/images/';
					var albums_id_obj = GeneralFactory.getFromLS('wishlist');
					console.log(albums_id_obj);
					var arr = [];
					angular.forEach(albums_id_obj, function(el){
						arr.push(el);
					});
					// console.log(arr);
					WishlistFactory.getWishlist(arr)
					.then(function(res_albums_obj){
						angular.forEach(res_albums_obj , function(album){
							album.image_path = assets_images.concat(album.image_path);
							$scope.wishlist.push(album);
						});
					});
				}


				init();
			}]);
})();