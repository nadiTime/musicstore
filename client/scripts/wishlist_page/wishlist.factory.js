(function(){
	'use strict';

	angular.module('musicstore.wishlist')
		.factory('WishlistFactory' , function($http){
			return {
				getWishlist : function(albums_obj){
					var baseUrl = 'api/router.php';
					var promise = $http.post(baseUrl+'/album/' , albums_obj)
					.then(function(response){
						console.log(response.data.data);
						return response.data.data;
					});
					return promise;
				}
			}
		});
})();