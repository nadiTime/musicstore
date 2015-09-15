(function(){
	angular.module('musicstore.directives')

	.directive('msHeader' , function(){
		return {
			restrict : 'E',
			templateUrl : 'client/scripts/directives/header/header.html',
			controller : 'HeaderController',
			controllerAs : 'hc'
		};
	})
})();