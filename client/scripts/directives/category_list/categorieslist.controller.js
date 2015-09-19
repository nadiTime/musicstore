(function(){
	'use strict';

	angular.module('categoriesListModule')
		.controller('CategorylistController' , [ '$scope', '$rootScope' ,'$location','CategorylistFactory' , function($scope , $rootScope,$location , CategorylistFactory){
			$scope.categoryListObj = [];	

			var init = function(){
				CategorylistFactory.getCategoryList()
				.then(function(categoryList){
					angular.forEach(categoryList.data , function(eachCategory){
						return $scope.categoryListObj.push(eachCategory);	
					});
				});
			}; 

			$scope.MarkRequestedCategory = function(id){
				$rootScope.activeCategory = id;
			};
			$scope.goToSelectedCategory = function(category_id){
				$location.path('/category/'+ category_id);
			}
			init();
		}]);	
})();






