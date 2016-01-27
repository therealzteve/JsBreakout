define(function(){
	
	function BallDirectionService(ball){
		
		return {
			calculate : function(pad){
				var winkel = ((ball.getShape().x + ball.getShape().radius/2) - (pad.x + pad.getBounds().width/2) )*1.5;
				console.log(winkel);
				winkel = winkel * (Math.PI/180);
				var left = Math.sin(winkel);
				var top  = Math.cos(winkel);
				
				return { "x" : left, "y": top * -1};
			}
		};
		
	}
	
	return BallDirectionService;
});