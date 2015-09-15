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
		        	return response.data;
		        });
		        return promise;
			},

			insertIntoLS : function(object, name){
				localStorage.setItem(name , JSON.stringify(object));
				return true;
			},
			getFromLS : function(name){
				var albums_obj = JSON.parse(localStorage.getItem(name));
				if (albums_obj == null) {
					var albums_obj = [];
				} 
				var data = JSON.parse(retrievedData);
				return data;
			},
			insertToObjectToLS : function(name,id,amount){
				var LS = this.getFromLS(name);
				if(typeof amount == 'undefined'){
					//whishlist
					LS.push(id);
					if(this.insertIntoLS(LS,name)){
						return true;
					}
				}
				else{
					//cart
					LS.album_id.push(id);
					LS.amount.push(amount);
					if(this.insertIntoLS(LS,name)){
						return true;
					}	
				}
			}

			DeleteFromObj : function(){}

		};
	}]);

})();

