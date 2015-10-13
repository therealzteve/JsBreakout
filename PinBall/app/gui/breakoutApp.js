angular.module('breakoutApp', [])
	.factory('$exceptionHandler', function() {
	  return function(exception, cause) {
	    exception.message += ' (caused by "' + cause + '")';
	    throw exception;
	  };
	})
	.service('gameService', function(){
		var bGame = breakOutGame();
		bGame.init();

		return {
			game : bGame
		}
	})
	.directive('shortcut', function() {
		  return {
			    restrict: 'E',
			    replace: true,
			    scope: true,
			    link:    function postLink(scope, iElement, iAttrs){
			      jQuery(document).on('keypress', function(e){
			         scope.$apply(scope.keyPressed(e.charCode));
			       });
			    }
			  };
			});
