(function(){
	"use strict";

	angular.module("musicstore.category")

	.config(function($routeProvider){
		$routeProvider.when("/category",
			{
			  templateUrl: "client/scripts/categories_page/categoryView.html",
			  controller: "HomepageController",
			  controllerAs: "hvm"
			}
		);
	})
})();
