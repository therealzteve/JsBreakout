//Registers key events
inputHandler = {
		kibo : new Kibo(),
		contexts : [],
		init : function(){
			inputHandler.kibo.down('any', this.handleInput)
		},
		registerContext : function(inputContext){
			inputHandler.contexts.push(inputContext);
		},
		handleInput : function(){	
			console.log("a key was pressed");
			inputHandler.contexts[inputHandler.contexts.length - 1]
				.handle(inputHandler.kibo.lastKey(),
						inputHandler.contexts )
		}
		
};

var InputContext = function(inputMapping){
	

	return {
		handle: function(key, contexts){
			var handled = inputMapping.handleKey(key);
			
			if(!handled){
				var contextsCopy = contexts.splice();
				contextsCopy.pop();
				if(contextsCopy.length > 0 ){
					contextsCopy[contextsCopy.length].handle(key, contextsCopy);
				}
			}
		} 
	}
};

var InputMapping = function(mappingArray){
	return {
		handleKey : function(key){
			
			for(var i = 0 ;   i <  mappingArray.length ; i++){
				if(mappingArray[i].key === key){
					mappingArray[i].callback();
					return true;
				}
			}
			return false;
		},
	};	
};




