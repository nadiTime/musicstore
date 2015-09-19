(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.factory('CheckoutFactory' , function($http){

			return {

				getOrders : function(data){
					var baseUrl = 'api/router.php';
					var promise = $http.post(baseUrl+'/order/checkout' , data )
					.then(function(response){
						console.log(response);
					});
				},

				getAlbums : function(albums_obj){
					var baseUrl = 'api/router.php';
					var promise = $http.post(baseUrl+'/album/' , albums_obj)
					.then(function(response){
						return response.data.data;
					});
					return promise;
				}
			};
		});
})();