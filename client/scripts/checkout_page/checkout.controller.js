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

				var init = function(){
					$scope.cart = GeneralFactory.getFromLS('cart');
				}; 

				$scope.fetchInfo = function(){
					var add = $scope.bill_address;
					var city = $scope.bill_city;
					var zip = $scope.bill_zipcode;
					var tel = $scope.bill_tel;
					$scope.details.push(add,city,zip,tel);
					$scope.accordion = $scope.accordion +1;
					console.log($scope.details);
				}

				init();
		}]);
})();