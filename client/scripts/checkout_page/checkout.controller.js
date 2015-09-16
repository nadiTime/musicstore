(function(){
	'use strict';

	angular.module('musicstore.checkout')
		.controller('CheckoutController' , ['$scope' , '$rootScope' , 'GeneralFactory' ,
			function($scope,$rootScope,GeneralFactory){
				$scope.cart = {};
				$scope.details = [];
				

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

					if (add & city & zip & tel) {
						$scope.details.push(add,city,zip,tel);
						$scope.accordion = $scope.accordion +1;
					}else {
						alert('one or more of the details is empty');
					}

				}

				$scope.cardInfoSubmit = function(){
					var card_type = GeneralFactory.Validate.inputt($scope.card_type.single_select);
					var card_holder = GeneralFactory.Validate.inputt($scope.card_holder);
					var card_number = GeneralFactory.Validate.creditCard()
				}

				init();
		}]);
})();