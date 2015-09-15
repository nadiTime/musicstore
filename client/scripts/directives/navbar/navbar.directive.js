(function(){
	angular.module('musicstore.directives')

	.directive('msNavbar' , function(){
		return {
			restrict : 'E',
			templateUrl : 'client/scripts/directives/navbar/navbar.html',
			controller : 'NavbarController',
			controllerAs : 'nvc'
		};
	})
})();