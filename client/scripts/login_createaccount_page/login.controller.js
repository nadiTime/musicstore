(function(){
	'use strict';

	angular.module('musicstore.login-logout')
		.controller('LoginController' , ['$timeout','$rootScope','$scope','$location', '$facebook','md5','GeneralFactory', 'LoginFactory',  function($timeout,$rootScope,$scope,$location,$facebook,md5,GeneralFactory,LoginFactory){
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
			$scope.loginFB = function(){
		    $facebook.login().then(function() {
		      refresh();
		    });
		  }
		  function refresh() {
		    $facebook.api("/me").then( 
		      function(response) {
		        var facebook_auth = $facebook.getAuthResponse();
		        $rootScope.user_id = response.id;
						$rootScope.user_auth = facebook_auth.accessToken;
						var signed_request = facebook_auth.accessToken.signedRequest;
						$rootScope.user_firstname = response.first_name;
						$rootScope.user_lastname = response.last_name;
						$rootScope.user_email = response.email;
						$rootScope.user_logged = true;
						$scope.logged.success = true;
						var user_obj = {'firstname': response.first_name,
														'lastname': response.last_name,
														'email': response.email,
														'user_logged': true,
														'auth': facebook_auth.accessToken,
														'user_id': response.id
													}
						localStorage.setItem('ms-user',JSON.stringify(user_obj));
						$timeout(function(){
							$location.path('/');
						},3000);
					},
		      function(err) {
		      	$scope.logged.fail = true;
  						$timeout(function(){
									$scope.logged.fail = false;
							},3000);
		      });
		  }

			$scope.sendData = function() {
				var details = $scope.details;
				var password = $scope.details.password;
				var re_password = $scope.details.passwordr;
				if(re_password !== password){
					alert('must repeat the same password!');
				}
				else{
					$scope.box.loading = true;
					var email = details.email;
					if(LoginFactory.handleForm(email,password,GeneralFactory)){
						LoginFactory.registerUser(details,md5)
						.then(function(response){
							$scope.box.loading = false;
							if(response.status == 200){
								$scope.box.active = false;
								$scope.reg_success = true;
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
								$scope.reg_failed = true;
								$timeout(function(){
									$scope.reg_failed = false;
								},3000);
							}
						});
					}
					$scope.box.loading = false;
				}
			}
		}]);
})();