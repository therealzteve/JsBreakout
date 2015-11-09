define(["app/event/eventListener"],function(EventListener){
	
	var LevelEventListener = function(levelService){
		
		var listener = EventListener();
		
		listener.handlers.HIT = function(eventData){
			if(eventData.collisionObject.type === 'brick'){
				levelService.remove(eventData.collisionObject);
				eventData.collisionObject.handleHit();
			}
		}
		
		return listener;
	}
	
	return LevelEventListener;
});