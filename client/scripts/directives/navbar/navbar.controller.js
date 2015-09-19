(function(){
	angular.module('musicstore.directives')

	.controller('NavbarController' , ['$scope', '$rootScope' , 'NavbarFactory' , function($scope , $rootScope, NavbarFactory){
		var init = function(){
			NavbarFactory.getItems()
			.then(function(response){
				return;
			});	
		};
		init();
	}]);
})();