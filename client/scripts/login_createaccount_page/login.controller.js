(function(){
	'use strict';

	angular.module('musicstore.login-logout')
		.controller('LoginController' , ['$scope' , function($scope){
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