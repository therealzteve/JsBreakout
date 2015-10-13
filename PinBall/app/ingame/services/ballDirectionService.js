function ballDirectionService(){
	
	return {
		calculate : function(ball, pad){
			var winkel = (ball.position.x - pad.position.x)*1.5;
			winkel = winkel * (Math.PI/180);
			var left = Math.sin(winkel);
			var top  = Math.cos(winkel);
			
			return { "x" : left, "y": top * -1};
		}
	};
	
}