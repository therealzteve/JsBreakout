define(["app/event/eventListener"], function(EventListener){
	var StoryEventHandler = function(storyService){
		
		var listener = EventListener();
		
		listener.handlers.SKIP = function(){
			// Load next step of story
		};
		
		listener.FULL_SKIP = function(){
			// Skip this story part
			storyService.end();
		}
		
		return listener
		
	}
	
	return StoryEventHandler;
});