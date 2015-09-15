(function(){
	angular.module('musicstore.directives')

	.directive('msCartlist' , function(){
		return {
			restrict : 'E',
			templateUrl : 'scripts/directives/cart_list/cartlist.html',
			controller : 'CartlistController',
			controllerAs : 'clc'
		};
	})
})();