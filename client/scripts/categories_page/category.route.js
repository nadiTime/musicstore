(function(){
	"use strict";
	angular.module("musicstore.category")
	.config(function($routeProvider){
		$routeProvider.when("/category/:category_id",
			{
			  templateUrl: "client/scripts/categories_page/categoryView.html",
			  controller: "CategoryController",
			  controllerAs: "hvm"
			}
		);
	})
})();
