(function(){
	'use strict';

	angular.module('navbar.module')
		.factory('NavbarFactory' , function($http){
			return {
				getItems : function() {
					var url = 'client/scripts/directives/navbar/json.json';
					var promise = $http.get(url)
					.then(function (response) {
						// console.log(response.data);
						return response.data;
					});
					return promise;
			}
		};
	});
})();