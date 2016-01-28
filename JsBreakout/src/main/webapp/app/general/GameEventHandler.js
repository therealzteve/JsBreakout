function GameEventHandler(game){
	
	function win(){
		console.log("You win!");
		game.stop();
	}
	
	function lose(){
		game.stop();
	}
	
	function levelCompleted(){
		if(game.levelHandler.isLastLevel()){
			win();
		}else{
			game.levelHandler.loadNextLevel();
		}
	}
	
	
	function reset(){
		
	}
	
	
	
	return {
		
		//When ingame lost
		lose : function(){
			lose();
		},
		//When ingame win
		win : function(){
			win();
		},
		//When a level is completed
		levelCompleted : function(){
			levelCompleted();
		},
		//When game is started
		start : function(){
			game.start();
		},
		
		//When ingame pause
		pause : function(){
			game.pause();
		}
	};
};