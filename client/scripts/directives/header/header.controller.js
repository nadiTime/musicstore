(function () {
    'use strict';

    angular
        .module('musicstore.directives')
        .controller('HeaderController', function ($scope,$rootScope,$location){
        	$scope.user_not_logged = false;
        	$scope.user_logged = false;
        	if(!$rootScope.user_logged){
        		$scope.user_not_logged = true;
        		$scope.user_logged = false;
        	}
        	else{
        		$scope.user_not_logged = false;
        		$scope.user_logged = true;
        	}
        	$scope.logUserOut = function(){
        		var logout = confirm('Are you sure you want to get out?');
        		if(logout){
        			localStorage.removeItem('ms-user');
        			$location.path('/');
                    $scope.user_not_logged = true;
                    $scope.user_logged = false;
        		}
        	}
        });
})();
