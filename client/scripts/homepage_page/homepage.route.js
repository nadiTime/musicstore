(function(){
	'use strict';

	angular.module('musicstore.homepage')

	.config(function($routeProvider){
		$routeProvider.when("/",
			{
			  templateUrl: "client/scripts/homepage_page/homepageView.html",
			  controller: "HomepageController",
			  controllerAs: "hvm"
			}
		);
	})
})();
