define([], function(){
	
	
	 function gameCtrl($scope, gameService){

		//$scope.score = gameService.game.score;
		$scope.score = {};
		
		//$scope.game = gameService.game;
		
		
		$scope.score.points = 2;

		$scope.start = function(){
			gameService.game.start();
		};
		
		$scope.keyPressed = function(keyNum){
			if(keyNum === 112){
				//gameService.game.pause();
			}
		};
		
//		breakOutGame.notifyChange = function(){
//			$scope.$digest();
//		};
		
		
	};
	
	gameCtrl.$inject = ['$scope', 'gameService'];
	
	return gameCtrl;
});
	
	