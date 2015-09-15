(function(){
	'use strict';

	angular.module('breadcrumbs.module').
		controller('BreadcrumbsController', '$routeParams' , 'breadcrumbs' , ['$scope' , function($scope , breadcrumbs , $routeParams){
			$scope.breads = ['Home' , 'Wishlist' , 'Checkout'];

		
		}]);
})();