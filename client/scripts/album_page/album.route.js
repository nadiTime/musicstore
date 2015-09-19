(function(){
	'use strict';

	angular.module('musicstore.album')

	.config(function($routeProvider){
		$routeProvider.when("/album",
			{
			  templateUrl: "client/scripts/album_page/albumView.html",
			  controller: "AlbumController",
			  controllerAs: "alc"
			});
		$routeProvider.when("/album/:album_id" , {
			templateUrl: "client/scripts/album_page/albumView.html",
			controller: "AlbumController",
			controllerAs: "alc"
		});
	})
})();
