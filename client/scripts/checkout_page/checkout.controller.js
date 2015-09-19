(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.controller('CheckoutController' , ['$scope' , '$location' , '$rootScope' , 'GeneralFactory' , 'AlbumFactory' , 'CheckoutFactory' , 
			function($scope,$location,$rootScope,GeneralFactory,AlbumFactory,CheckoutFactory){
				$scope.cart = {};
				$scope.ordered_albums = [];
				$scope.details = [];
				$scope.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
				$scope.years = ['2016','2017','2018','2019','2020','2021'];
				$scope.pay = '';
				$scope.total_price = 0;
		

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
					var cart = GeneralFactory.getFromLS('cart');
					var albums_obj = cart.albums;
					var i = 0 ;
					CheckoutFactory.getAlbums(albums_obj)
					.then(function(response){
						angular.forEach(response , function(album){
							var price = album.album_price;
							var order_data = {
								id : album.album_id,
							 	name : album.album_name,
							 	artist : album.album_artist,
							 	amount : cart.amount[i],
							 	price : album.album_price,
							 	total : price*cart.amount[i]
							}
							$scope.ordered_albums.push(order_data);
						});
						angular.forEach($scope.ordered_albums , function(album){
							$scope.total_price += album.total;
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

				$scope.purchaseAlbums = function(){
					var cart = GeneralFactory.getFromLS('cart');
					var amount = cart.amount;
					var albums = cart.albums;
					
					var final_obj = {
						user_auth : $rootScope.user_auth,
						user_id : $rootScope.user_id,
						order_shipping_city : $scope.bill_city,
						order_shipping_address : $scope.bill_address,
						zipcode : $scope.bill_zipcode,
						amount : amount,
						albums : albums
					};

					if ($rootScope.user_logged) {
						CheckoutFactory.getOrders(final_obj)
						.then(function(response){
							alert('Order Completed');
							$location.path('/');
						},function(error){
							console.log(error);
						});	
					}

					
				}

				init();
		}]);
})();