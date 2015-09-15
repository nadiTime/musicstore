(function(){
	'use strict';

	angular.module('musicstore.wishlist')
		.controller('WishlistController' , ['$scope' , 'GeneralFactory' , 'WishlistFactory' ,
			function($scope,GeneralFactory,WishlistFactory){
				$scope.wishlist = [];

				var init = function(){
					var albums_id_obj = GeneralFactory.getFromLS();
					// console.log(albums_id_obj);
					var arr = [];
					angular.forEach(albums_id_obj, function(el){
						arr.push(el);
					});
					// console.log(arr);
					WishlistFactory.getWishlist(arr)
					.then(function(res_albums_obj){
						angular.forEach(res_albums_obj , function(album){
							console.log(album);
							$scope.wishlist.push(album);
						});
					});
				}


				init();
			}]);
})();