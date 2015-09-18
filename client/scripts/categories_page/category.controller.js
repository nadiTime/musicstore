(function(){
	angular.module('musicstore.category')
		.controller('CategoryController' , ['$location','$scope' , '$rootScope' , '$routeParams' , 'CategoryFactory' , 'GeneralFactory' ,
		 function($location,$scope,$rootScope,$routeParams,CategoryFactory,GeneralFactory){
		 	$scope.goToSelectedAlbum = function(album_id){
				$location.path('/album/'+ album_id);
			}
			$scope.showAlbums = false;
			$scope.noAlbums = false;
		 	$scope.albumsToDisplay = [];
		 	$scope.category_name = '';
		 	$scope.items_count = 0;
			var category_id = $routeParams.category_id;
			var assets_images = '/musicstore/assets/images/';

			var init = function(){
				CategoryFactory.getAlbumsInCategory(category_id)
				.then(function(albumsList){
					console.log(albumsList);
					if(albumsList.data.data.length > 0){
						$scope.showAlbums = true;
						$scope.category_name = albumsList.data.data[0].genre_name;
						angular.forEach(albumsList.data.data , function(eachAlbum){
							eachAlbum.image_path = assets_images.concat(eachAlbum.image_path); 
							$scope.albumsToDisplay.push(eachAlbum);
							$scope.items_count++;
						});
					}
					else{
						$scope.noAlbums = true;
					}
				});
			}
			init();
		}]);
})();