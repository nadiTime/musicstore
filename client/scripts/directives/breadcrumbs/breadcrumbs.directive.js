(function(){
	angular.module('musicstore.directives')

	.directive('msBreadcrambs' , function(){
		// return {
		// 	restrict : 'E',
		// 	templateUrl : 'angular/directives/breadcrumbs/breadcrumbs.html',
		// 	controller : 'BreadcrumbsController',
		// 	controllerAs : 'bcc'
		// };
		return {
	        restrict: 'E',
	        transclude: true,
	        template: '<ul class="breadcrumbs"><li ng-repeat="breadcrumb in breadcrumbs.getDynamicLabel() track by breadcrumb.path" ng-class="{ active: $last }"><a ng-if="!$last" ng-href="{{ breadcrumb.path }}" ng-bind="breadcrumb.label" class="margin-right-xs"></a> <span ng-if="!$last"> > </span><span ng-if="$last" ng-bind="breadcrumb.label"></span></li></ul>',
	        replace: true
	    };
	})
})();