(function(){
	'use strict';
	
	angular.module('musicstore.factory', [])

	.factory('GeneralFactory' ,  [ '$http' ,'$rootScope',  function($http,$rootScope){
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
				var new_album = true;
				if(typeof amount == 'undefined'){
					for (var i = 0; i<LS.length; i++){
						if (LS[i] == id) {
							new_album = false;
						} 
					}
					if (new_album) {
						LS.push(id);
					}
				}
				else{
					console.log(name,id,amount);
					//cart
					if(amount == 0){
						amount = 1;
					}
					
					if (LS.length == 0 ) {
							LS = {}
							LS.albums = [id];
							LS.amount = [amount];
					}
					else{
						for (var i = 0; i<LS.albums.length; i++){
							if (LS.albums[i] == id) {
								LS.amount[i] += amount;
								new_album = false;
								break;
							}
						}
						if(new_album){
							LS.albums.push(id);
							LS.amount.push(amount);
						}
					}
					$rootScope.cart_amount += amount;	
				}
				this.insertIntoLS(LS,name);
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
				},
				inputt : function(input){
					if (!input) {
						return false;
					}
					return input;
				},
				creditCard : function(card_num,card_type){
					if (card_type == 'Visa') {
						var re = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
						return re.test(card_num);
					}else if (card_type == 'MasterCard'){
						var re = /^(?:5[1-5][0-9]{14})$/;
						return re.test(card_num);
					}else if(card_type == 'American Express'){
						var re = /^(?:3[47][0-9]{13})$/;
						return re.test(card_num);
					}else if(card_type == 'Diners'){
						var re = /^(3(?:0[0-5]|[68][0-9])[0-9]{11})*$/;
						return re.test(card_num);
					}else{
						return false;
					}
				}
			}

		};
	}]);

})();

