define(["app/event/eventListener"], function(EventListener){
	var TestEventListener = function(callback){
		
		var listener = EventListener();
		
		listener.handlers.TEST = function(){
			callback();
		};
		
		return listener
		
	}
	
	return TestEventListener;
});