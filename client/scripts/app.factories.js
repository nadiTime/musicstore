(function(){
	'use strict';
	
	angular.module('musicstore.factory', [])

	.factory('GeneralFactory' ,  [ '$http' ,  function($http){
		return {

		   /* getAlbumsForHomepage
			*			
			* http request for the latest,new and special albums that displayed in homepage
			* return array of albums
			*/
			getLatestAlbumsForHomepage : function(){
				var baseUrl = 'api/router.php';
				var promise = $http.get(baseUrl+'/album/latest/')
				.then(function (response) {
		        	// console.log(response.data);
		        	return response.data;
		        });
		        return promise;
			},

			insertIntoLS : function(album_id){
				albums_obj = JSON.parse(this.getFromLS());
				if (albums_obj == null) {
					var albums_obj = [];
					albums_obj.push(album_id);
				} else{
					albums_obj = JSON.parse(this.getFromLS());
					albums_obj.push(album_id);
				};
				console.log(albums_obj);
				localStorage.setItem('albums_object' , JSON.stringify(albums_obj));
				return true;
			},
			getFromLS : function(){
				var retrievedData  = localStorage.getItem('albums_object');
				var data = JSON.parse(retrievedData);
				return data;
			},
			DeleteFromObj : function(){}

		};
	}]);

})();

