(function(){
	'use strict';

	angular.module('musicstore.login-logout')
		.controller('LoginController' , ['$timeout','$rootScope','$scope','$location', 'md5','GeneralFactory', 'LoginFactory',  function($timeout,$rootScope,$scope,$location,md5,GeneralFactory,LoginFactory){
			$scope.login_email = '';
			$scope.login_password = '';
			$scope.logged = {
				success : false,
				faild : false
			}
			$scope.loginUser = function(){
				var email = $scope.login_email;
				var password = $scope.login_password;
				if(LoginFactory.handleForm(email,password,GeneralFactory)){
					LoginFactory.loginUser(email,password,md5)
					.then(function(response){
						if(response.status == 200){
								var data = response.data;
								$rootScope.user_id = data.user.user_id;
								$rootScope.user_auth = data.auth;
								$rootScope.user_firstname = data.user.user_firstname;
								$rootScope.user_lastname = data.user.user_lastname;
								$rootScope.user_email = $scope.login_email;
								$rootScope.user_logged = true;
								$scope.logged.success = true;
								var user_obj = {'firstname': data.user.user_firstname,
																'lastname': data.user.user_lastname,
																'email': $scope.login_email,
																'user_logged': true,
																'auth': data.auth,
																'user_id':data.user.user_id
															}
								localStorage.setItem('ms-user',JSON.stringify(user_obj));
								$timeout(function(){
									$location.path('/');
								},3000);
						}
						else{
							$scope.logged.fail = true;
							$timeout(function(){
									$scope.logged.fail = false;
							},3000);
						}
					});
				}
			}	
			$scope.details = {};
	
			$scope.email = {
				checking: false,
				valid: -1
			}
			
			$scope.box = {
				active: false,
				loading: false
			}

			$scope.confirmation =  {
				active : false
			}
			$scope.rejection = {
				active : false
			}
			
			$scope.sendData = function() {
				$scope.box.loading = true;
			
				var self = this;
				// this.changeScope();
			
				LoginFactory.sendForm( $scope.details )
				.success(function( response ) {
					$scope.box.loading = false;
					$scope.box.active = false;
				})

				.error(function( response, status ) {
					console.log( status );
				});
			}
			
		    $scope.$watch(
				"details.email",
				function( newEmail, oldEmail ) {

					if ( newEmail === oldEmail )
						return;
					
					$scope.email.valid = -1;
					$scope.email.checking = true;
						
					LoginFactory.checkEmail( newEmail )
					.success(function( response ) {
						$scope.email.checking = false;
						$scope.email.valid = parseInt( response );
					})
					.error(function( response, status ) {
					});
				}
			);
		}]);
})();