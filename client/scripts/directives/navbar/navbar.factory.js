(function(){
	'use strict';

	angular.module('navbar.module')
		.factory('NavbarFactory' , function($http){
			return {
				getItems : function() {
					var url = 'client/scripts/directives/navbar/json.json';
					var promise = $http.get(url)
					.then(function (response) {
						return response.data;
					});
					return promise;
			}
		};
	});
})();