define(
	function(){
		
	
	var EventManager = function(parent){
		var listeners = [];
		
		return {
			event : function(name, callbackObject){
				for(var i = 0; i < listeners.length; i++){
					listeners[i].handleEvent(name, callbackObject);
				}
				
				if(typeof parent !== 'undefined'){
					parent.event(name, callbackObject);
				}
			},
			registerListener : function(listener){
				listeners.push(listener);
			},
			removeListener : function(listener){
				//Implement later
			}
			
		}
	}
	
	return EventManager;
});