define(["app/event/eventManager", "app/story/storyEventHandler"],function(EventManager, StoryEventHandler){
	
	var StoryService = function(parentEventManager){
		
		var storyEventManager = EventManager(parentEventManager);
		
		var storyService = {
			
			start : function(number){
				
				// Work on this later
				storyService.end();
			},
			end : function(){
				storyEventManager.event("STORY_END");
			}
		};
		
		storyEventManager.registerListener(StoryEventHandler(storyService));
		
		return storyService;
	};
	
	return StoryService;
});
