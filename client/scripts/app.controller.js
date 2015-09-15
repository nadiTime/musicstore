(function(){
	'use strict';

	angular.module('musicstore')
		.controller('musicstore.controller' , ['$scope' , '$rootScope' , 'GeneralFactory' , 
		 function($scope,$rootScope,GeneralFactory){
			$rootScope.activeCategory = false;
			$rootScope.user_id = 2;
			$rootScope.user_auth = 'HgP6LZWsfbNEEXBwVS5px4ras6p794d8‏';

		}]);
})();