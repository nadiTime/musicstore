(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.factory('CheckoutFactory' , function($http){

			return {

				getOrders : function(data){
					var baseUrl = 'api/router.php';
					//var data = {'user_id' : };
					var promise = $http.post(baseUrl+'/order/checkout' , data )
				}
			}
		});
})();