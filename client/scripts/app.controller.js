(function(){
	'use strict';

	angular.module('musicstore')
		.controller('musicstore.controller' , ['$scope' , '$rootScope' , 'GeneralFactory' , 
		 function($scope,$rootScope,GeneralFactory){
			$rootScope.activeCategory = false;
			$rootScope.user_id = false;
			$rootScope.user_auth = false;
		}]);
})();