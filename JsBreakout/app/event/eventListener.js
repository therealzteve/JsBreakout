define(function(){
	var EventListener = function(){
		return {
			handlers : {},
			handleEvent : function(name, callbackObject){
				if(typeof this.handlers[name] !== 'undefined'){
					this.handlers[name](callbackObject);
				}
			}
		};
	}
	
	return EventListener;
});