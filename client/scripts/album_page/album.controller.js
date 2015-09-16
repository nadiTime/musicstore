(function(){
	angular.module('musicstore.album')
		.controller('AlbumController' , ['$scope' , '$rootScope' , '$routeParams' , 'AlbumFactory' , 'GeneralFactory' ,
		 function($scope,$rootScope,$routeParams,AlbumFactory,GeneralFactory){

			$scope.album_id = $routeParams.album_id;
			$scope.songsInAlbum = [];
			$scope.add_amount = 0;
			var getAlbumById = function(album_id){
				// console.log(album_id);
				AlbumFactory.getAlbumById(album_id)
				.then(function(response){
					// console.log(response);
					$scope.album_name = response.data.album_name;
					$scope.album_artist = response.data.album_artist;
					$scope.album_price = response.data.album_price;
					$scope.album_description = response.data.album_description;
					$scope.album_long_description = response.data.album_long_description;
					$scope.album_stock = response.data.album_stock;
					$scope.album_image_path = '/musicstore/assets/images/' + response.data.image_path;
					$scope.album_release_year = response.data.album_release_year;
				});
			};

			$scope.getSongsByAlbumId = function(album_id){
				AlbumFactory.getSongsByAlbumId(album_id)
				.then(function(response){
					angular.forEach(response , function(song){
						$scope.songsInAlbum.push(song);
						return;
					});
				});
			};

			$scope.AddToWishlist = function(album_id){
					GeneralFactory.insertToObjectToLS('wishlist', album_id);
			}

			$scope.AddToCart = function(album_id){
					amount = $scope.add_amount;
					GeneralFactory.insertToObjectToLS('cart', album_id,amount);
			}

			getAlbumById($scope.album_id);

		}]);
})();