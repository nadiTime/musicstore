(function(){
	'use strict';

	angular.module('musicstore.search')
		.factory('SearchFactory' , function($http){
			return {
				searchAlbum : function(term){
					var baseUrl = 'api/router.php';
					var promise = $http.get(baseUrl+'/album/term/'+term)
					.then(function(response){
						return response.data.data;
					});
					return promise;	
				}
			}
		});
})();