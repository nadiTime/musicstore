(function () {
    'use strict';

    angular
        .module('musicstore.homepage')
        	.controller('HomepageController', ['$scope' , '$location' , 'GeneralFactory' ,  
        		function ($scope , $location , GeneralFactory){
        			$scope.latestAlbumsList = [];
        			$scope.newAlbums = [];
        			$scope.albumToDisplay = [];
        			var assets_images = '/musicstore/assets/images/';
	   				var init = function(){
						GeneralFactory.getLatestAlbumsForHomepage()
						.then(function(albumsList){
							$scope.albumToDisplay.push(albumsList.data[0])
							angular.forEach(albumsList.data , function(eachAlbum){
								eachAlbum.image_path = assets_images.concat(eachAlbum.image_path); 
								$scope.latestAlbumsList.push(eachAlbum);
								$scope.newAlbums.push(eachAlbum);
								return;	
							});
						});
					}

					$scope.goToSelectedAlbum = function(album_id){
						$location.path('/album/'+album_id);
					}

					$scope.addToWishlist = function(album_id){
						var al = GeneralFactory.insertToObjectToLS('wishlist',album_id);
						return;
					}

					$scope.addToCart = function(album_id,amount){
						var real_amount = amount;
						if(typeof amount == 'undefined'){
							real_amount = 1;
						}
						var al = GeneralFactory.insertToObjectToLS('cart',album_id,real_amount);
						return;
					}
					init();
   			}]);
})();
