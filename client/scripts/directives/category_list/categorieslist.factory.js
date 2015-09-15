(function(){
	'use strict';

	angular.module('categoriesListModule')

	.factory('CategorylistFactory' , function($http){
		return {
			getCategoryList : function() {
				var baseUrl = 'api/router.php';
				var promise = $http.get(baseUrl+"/category/")
				.then(function (response) {
		        	// console.log(response.data);
		        	return response.data;
		        });
		        return promise;
			}
		};
	});
})();