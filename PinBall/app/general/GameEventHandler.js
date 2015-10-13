function GameEventHandler(game){
	
	function win(){
		console.log("You win!");
		game.stop();
	}
	
	function lose(){
		game.stop();
	}
	
	function levelCompleted(){
		console.log("level completed!");
	}
	
	function loadNextLevel(){
		game.levelHandler.loadNextLevel();
	}
	
	function reset(){
		
	}
	
	return {
		lose : function(){
			lose();
		},
		win : function(){
			win();
		},
		levelCompleted : function(){
			levelCompleted();
			if(game.levelHandler.isLastLevel()){
				win();
			}else{
				loadNextLevel();
			}
		},
		start : function(){
			game.start();
		},
		pause : function(){
			game.pause();
		}
	};
};