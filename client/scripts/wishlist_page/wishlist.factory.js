(function(){
	'use strict';

	angular.module('musicstore.wishlist')
		.factory('WishlistFactory' , function($http){
			return {
				getWishlist : function(albums_obj){
					var baseUrl = 'api/router.php';
					var promise = $http.post(baseUrl+'/album/' , albums_obj)
					.then(function(response){
						return response.data.data;
					});
					return promise;
				}
			}
		});
})();