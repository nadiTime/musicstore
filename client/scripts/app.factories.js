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
				var retrievedData = localStorage.getItem(name);
				var data = [];
				if (retrievedData != null) {
					data = JSON.parse(retrievedData);
				} 
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
			},

			DeleteFromObj : function(){},

			Validate : {
				email : function(email){
				    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				    return re.test(email);
				},
				password : function(password){
					if(password.length < 8 || password.length > 8){
						return 'length';
					}
					var re = /^[a-z0-9]+$/i;
					if(!re.test(password)){
						return 'alphanum';
					}
				}
			}

		};
	}]);

})();

