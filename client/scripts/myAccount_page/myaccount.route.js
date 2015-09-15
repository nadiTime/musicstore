(function(){
	"use strict";

	angular.module("musicstore.account"	)

	.config(function($routeProvider){
		$routeProvider.when("/account",
			{
			  templateUrl: "client/scripts/myAccount_page/accountView.html",
			  controller: "AccountController",
			  controllerAs: "ac",
			  labal: "Account"
			}
		);
	})
})();
