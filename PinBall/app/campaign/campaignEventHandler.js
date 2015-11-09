define(["app/event/eventListener"], function(EventListener){
	var StoryEventHandler = function(campaignService){
		
		var listener = EventListener();
		
		listener.handlers.STORY_END = function(){
			campaignService.next();
			// Load next step of story
		};
		
		listener.handlers.LEVEL_COMPLETED = function(){
			campaignService.next();
		}
		
		return listener;
	}
	
	return StoryEventHandler;
});