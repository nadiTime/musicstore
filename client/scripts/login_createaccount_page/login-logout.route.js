(function(){
	"use strict";

	angular.module("musicstore.login-logout")

	.config(function($routeProvider){
		$routeProvider.when("/login",
			{
			  templateUrl: "client/scripts/login_createaccount_page/loginLogoutView.html",
			  controller: "LoginController",
			  controllerAs: "lc"
			}
		);
	})
})();
