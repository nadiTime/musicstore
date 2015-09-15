(function(){
	"use strict";

	angular.module("musicstore.wishlist")

	.config(function($routeProvider){
		$routeProvider.when("/wishlist",
			{
			  templateUrl: "client/scripts/wishlist_page/wishlistView.html",
			  controller: "WishlistController",
			  controllerAs: "wlc"
			}
		);
	})
})();
