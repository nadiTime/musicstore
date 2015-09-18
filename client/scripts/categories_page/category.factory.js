(function(){
	'use strict';

	angular.module('musicstore.category')

	.factory('CategoryFactory' , function($http){
		return {
			getAlbumsInCategory : function(category_id) {
				var baseUrl = 'api/router.php';
				var promise = $http.get(baseUrl+'/category/'+category_id)
				.then(function (response) {
        	return response;
        });
        return promise;
			}
		};
	});
})();