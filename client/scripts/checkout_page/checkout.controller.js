(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.controller('CheckoutController' , ['$scope' , '$rootScope' , 'GeneralFactory' ,
			function($scope,$rootScope,GeneralFactory){
				$scope.cart = {};
				$scope.details = [];
				$scope.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
				$scope.years = ['2016','2017','2018','2019','2020','2021'];
				

				$scope.bill_address = '';
				$scope.bill_city = '';
				$scope.bill_zipcode = '';
				$scope.bill_tel = '';

				$scope.card_holder = '';
				$scope.card_number='';
				$scope.card_exp_date = '';
				$scope.card_type = {
					single_select : null
				};



				var init = function(){
					$scope.cart = GeneralFactory.getFromLS('cart');
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

				$scope.cardInfoSubmit = function(){
					var card_type = GeneralFactory.Validate.inputt($scope.card_type.single_select);
					var card_holder = GeneralFactory.Validate.inputt($scope.card_holder);
					var card_number = GeneralFactory.Validate.inputt($scope.card_number);

					if (!card_type & !card_holder & !card_number) {
						alert('one or more of the credit card details is empty');
					}

					var card_number = GeneralFactory.Validate.creditCard(card_number,card_type);

					if (!card_number) {
						alert('invalid card number');
					}


				}

				init();
		}]);
})();