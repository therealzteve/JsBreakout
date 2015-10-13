angular.module('breakoutApp')
	.controller('gameCtrl', function($scope,gameService){
		
		$scope.score = gameService.game.score;
		
		$scope.game = gameService.game;
		

		$scope.start = function(){
			gameService.game.start();
		}
		
		$scope.keyPressed = function(keyNum){
			if(keyNum === 112){
				gameService.game.pause();
			}
		}
		
		breakOutGame.notifyChange = function(){
			$scope.$digest();
		};
		
		
});