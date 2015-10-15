var IngameEventHandler = function(parentEventHandler){
	
	function levelCompleted(){
		parentEventHandler.levelCompleted();
	}
	
	function pause(){
		parentEventHandler.pause();
	}
	
	return {
		pause : function(){
			pause();
		},
		
		levelCompleted : function(){
			levelCompleted();
		}
	}
}