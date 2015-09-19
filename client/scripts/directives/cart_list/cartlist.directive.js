(function(){
	angular.module('musicstore.directives')

	.directive('msCartlist' , function(){
		return {
			restrict : 'E',
			templateUrl : 'client/scripts/directives/cart_list/cartList.html',
			controller : 'CartlistController',
			controllerAs : 'clc'
		};
	})
})();