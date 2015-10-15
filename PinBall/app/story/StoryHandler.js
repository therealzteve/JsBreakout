var StoryHandler = function(options){
	
	return {
		start : function(number){
			options.parentEventHandler.levelCompleted();
		}
	};
};