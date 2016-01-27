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
				var contextsCopy = contexts.slice(); 
				contextsCopy.pop();
				if(contextsCopy.length > 0 ){
					contextsCopy[contextsCopy.length-1].handle(key, contextsCopy);
				}
			}
		} ,
		getMapping : function(){
			return inputMapping;
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
		getMappingArray : function(){
			return mappingArray;
		}
	};	
};




