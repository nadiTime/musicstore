(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.controller('CheckoutController' , ['$scope' , '$rootScope' , 'GeneralFactory' , 'AlbumFactory' , 
			function($scope,$rootScope,GeneralFactory,AlbumFactory){
				$scope.cart = {};
				$scope.ordered_albums = [];
				$scope.details = [];
				$scope.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
				$scope.years = ['2016','2017','2018','2019','2020','2021'];
				$scope.pay = '';
				

				$scope.bill_address = '';
				$scope.bill_city = '';
				$scope.bill_zipcode = '';
				$scope.bill_tel = '';

				$scope.card_cvc = '';
				$scope.card_holder = '';
				$scope.card_number = '';
				$scope.card_exp_y = '';
				$scope.card_exp_m = '';
				$scope.card_type = {
					single_select : null
				};



				var init = function(){
					$scope.cart = GeneralFactory.getFromLS('cart');
					angular.forEach($scope.cart.albums , function(eachAlbumId){
						AlbumFactory.getAlbumById(eachAlbumId)
						.then(function(response){
							$scope.album_price = response.data.album_price;
							$scope.album_name = response.data.album_name;
							$scope.album_artist = response.data.album_artist;
							$scope.ordered_albums.push(data);
							console.log($scope.ordered_albums);
						});
					});
				}; 

				$scope.billingInfoSubmit = function(){
					var add = GeneralFactory.Validate.inputt($scope.bill_address);
					var city = GeneralFactory.Validate.inputt($scope.bill_city);
					var zip = GeneralFactory.Validate.inputt($scope.bill_zipcode);
					var tel = GeneralFactory.Validate.inputt($scope.bill_tel);

					if (add.length > 0 & city.length > 0 & zip.length > 0 & tel.length > 0) {
						$scope.details.push(add,city,zip,tel);
						$scope.accordion = $scope.accordion +1;
					}else {
						alert('one or more of the details is empty');
					}

				}

				$scope.cardInfoSubmit = function(pay_method){
					if (pay_method == 1) {
						console.log('payment will be in check or money order');
						$scope.accordion = $scope.accordion +1;
						return;
					} 

					var card_type = GeneralFactory.Validate.inputt($scope.card_type.single_select);
					var card_holder = GeneralFactory.Validate.inputt($scope.card_holder);
					var card_cvc = GeneralFactory.Validate.inputt($scope.card_cvc);
					var card_exp_m = $scope.card_exp_m;
					var card_exp_y = $scope.card_exp_y;
					console.log('h');
					if (!card_type || !card_holder || !card_exp_m || !card_exp_y || !card_cvc) {
						alert('one or more of the credit card details is empty');
						return;
					}

					var card_number = GeneralFactory.Validate.creditCard($scope.card_number,card_type);

					if (!card_number) {
						alert('invalid card number');
						return;
					}
					$scope.details.push(card_type,card_holder,$scope.card_number,card_cvc);
					console.log($scope.details);
					$scope.accordion += 1;


				}

				init();
		}]);
})();