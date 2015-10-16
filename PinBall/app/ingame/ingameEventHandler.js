var IngameEventHandler = function(ingameHandler, parentEventHandler){
	
	function levelCompleted(){
		parentEventHandler.levelCompleted();
	}
	
	function pause(){
		ingameHandler.pause();
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