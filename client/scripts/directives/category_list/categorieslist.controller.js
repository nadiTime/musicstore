(function(){
	'use strict';

	angular.module('categoriesListModule')
		.controller('CategorylistController' , [ '$scope', '$rootScope' ,'CategorylistFactory' , function($scope , $rootScope , CategorylistFactory){
			$scope.categoryListObj = [];	

			var init = function(){
				CategorylistFactory.getCategoryList()
				.then(function(categoryList){
					angular.forEach(categoryList.data , function(eachCategory){
						// console.log(eachCategory);
						return $scope.categoryListObj.push(eachCategory);	
					});
				});
			}; 

			$scope.MarkRequestedCategory = function(id){
				// console.log(id);
				$rootScope.activeCategory = id;
				console.log($rootScope.activeCategory);
			};

			init();
		}]);	
})();






