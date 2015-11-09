define(['app/gui/gameController'],function(gameController){
	
	function UIService(game){
		
		angular.module('breakoutApp', [])
		.factory('$exceptionHandler', function() {
		  return function(exception, cause) {
		    exception.message += ' (caused by "' + cause + '")';
		    throw exception;
		  };
		})
		.service("gameService", function(){
			return {
				"game" : game 
			};
		})
		.controller("gameCtrl", gameController);
//		.directive('shortcut', function() {
//			  return {
//				    restrict: 'E',
//				    replace: true,
//				    scope: true,
//				    link:    function postLink(scope, iElement, iAttrs){
//				      jQuery(document).on('keypress', function(e){
//				         scope.$apply(scope.keyPressed(e.charCode));
//				       });
//				    }
//			};
//		});	
		
		angular.bootstrap(document, ['breakoutApp']);
	}
	
	return UIService;
});

