(function(){
	'use strict';

	angular.module('musicstore.search')

	.directive('msSearch' , function(){
		return {
			restrict : 'E',
			templateUrl : 'client/scripts/directives/search/search.html',
			controller : 'SearchController',
			controllerAs : 'sc'
		};
	})
})();