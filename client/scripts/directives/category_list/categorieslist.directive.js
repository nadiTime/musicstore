(function(){
	angular.module('musicstore.directives')

	.directive('msCategorylist' , function(){
		return {
			restrict : 'E',
			templateUrl : 'client/scripts/directives/category_list/categoryList.html',
			controller : 'CategorylistController',
			controllerAs : 'cat'
		};
	})
})();