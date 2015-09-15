(function(){
	'use strict';
	angular.module('musicstore.login-logout')
	.factory('LoginFactory', function($http){
		return {
			handleForm : function(email,password,GeneralFactory){
				var valid = false;
				if(email.length == 0 && password.length == 0){
					alert('must enter password and email');
				}
				else{
					if(email.length > 0){
						if(!GeneralFactory.Validate.email(email)){
							valid = false;
							alert('invalid email');
						}
						else{
							valid = true;
						} 
					}
					else{
						alert('must enter email');
						valid = false;
					}
					if(password.length > 0){
						if(GeneralFactory.Validate.password(password) == 'length'){
							valid = false;
							alert('password must be between 8 to 16 chars');
						}
						 else if(GeneralFactory.Validate.password(password) == 'alphanum'){
							valid = false;
							alert('password must be alphanum');
						}
						else{
							valid = true;
						}
					}
					else{									
						alert('must enter password');
						valid = false;
					}
					if(valid){
						return true;
					}
				}
			},

			loginUser : function(email,password,md5){
				var hashed_pass = md5.createHash(password);
				var data = {
					email : email,
					password : hashed_pass
				}
				var urlBase = 'api/router.php';
				var promise = $http.post(urlBase + '/user/login/', data)
				.then(function(response){
					return response.data;
				},function(error){
					console.log(error);
				});
				return promise;
			}
		}
	});
})();