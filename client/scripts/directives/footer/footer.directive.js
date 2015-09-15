(function(){
	angular.module('musicstore.directives')

	.directive('msFooter' , function(){
		return {
			restrict : 'E',
			templateUrl : 'client/scripts/directives/footer/footer.html',
			controller : 'FooterController',
			controllerAs : 'fc'
		};
	})
})();