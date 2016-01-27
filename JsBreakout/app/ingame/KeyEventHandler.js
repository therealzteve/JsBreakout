var KeyEventHandler = function(eventHandler){
	 return {
		 registerEvents : function(){
			 window.onkeyup = function(e) {
				    var key = e.keyCode ? e.keyCode : e.which;

				    if (key === 80) {
				    	console.log("test");
				        eventHandler.pause();
				    }else if (key === 27) {
				        eventHandler.pause();
				    }
				 }
		 },
		 deRegisterEvents : function(){
			 window.onkeyup = function(){};
		 }
	 };
	 
}