(function(){
	'use strict';

	angular.module('musicstore.album')

	.factory('AlbumFactory' , function($http,$location){
		return {
			getAlbumById : function(album_id) {
				var baseUrl = 'api/router.php';
				var promise = $http.get(baseUrl+'/album/'+album_id)
				.then(function (response) {
		        	return response.data;
		        });
		        return promise;
			},
			getSongsByAlbumId : function(album_id){
				var baseUrl = 'api/router.php';
				var promise = $http.get(baseUrl+'/album/songs/'+album_id)
				.then(function(response){
					return response.data.data;
				});
				return promise;
			}
		};
	});
})();