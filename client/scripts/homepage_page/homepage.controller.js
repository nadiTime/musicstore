(function () {
    'use strict';

    angular
        .module('musicstore.homepage')
        	.controller('HomepageController', ['$scope' , '$location' , 'GeneralFactory' ,  
        		function ($scope , $location , GeneralFactory){
        			$scope.latestAlbumsList = [];
        			$scope.newAlbums = [];
        			$scope.albumToDisplay = [];

	   				var init = function(){
						GeneralFactory.getLatestAlbumsForHomepage()
						.then(function(albumsList){
							// console.log(albumsList);
							$scope.albumToDisplay.push(albumsList.data[0])
							// console.log($scope.albumToDisplay);
							angular.forEach(albumsList.data , function(eachAlbum){
								// console.log(eachAlbum);
								$scope.latestAlbumsList.push(eachAlbum);
								$scope.newAlbums.push(eachAlbum);
								return;	
							});
						});
					}; 

					$scope.goToSelectedAlbum = function(album_id){
						// console.log(album_id);
						$location.path('/album/'+album_id);
					};

					$scope.AddToWishlist = function(album_id){
						// console.log(album_id);
						var al = GeneralFactory.insertIntoLS(album_id);
						console.log(al);
						return;
					};

					init();
       			}]);
})();
