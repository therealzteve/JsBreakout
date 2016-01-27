function BallCollisionHandler(ball, pad, brickService, view, eventHandler){
	var bds = ballDirectionService();
	var cs = collisionService();
	
	
	function handlePadCollision(){
		if(cs.checkCollision(ball.getShape(),pad.getShape())){
			
			ball.direction = 
				bds.calculate(
					ball.getShape(),
					pad.getShape()
			);
			
		}
	};
	
	function handleBrickCollision(){
		
		for(var i = 0 ;  i < brickService.getBricks().length ; i++){
			if(cs.checkCollision(ball.getShape(), brickService.getBricks()[i].getShape())){
				brickService.hit(brickService.getBricks()[i]);
				ball.direction.y = ball.direction.y *-1;
			}
		}
		
	}
	
	function handleWallCollision(){
		if(ball.getShape().position.y < 0){
			ball.direction.y = ball.direction.y * -1;
		}
		
		if(ball.getShape().position.x < 0 || ball.getShape().position.x > view.viewSize.width){
			ball.direction.x = ball.direction.x * -1;
		}
		
		if(ball.getShape().position.y > view.viewSize.height){
			eventHandler.lose();
		}
	};
	
	
	return {
		handleCollisions : function(){
			handleWallCollision();
			handlePadCollision();
			handleBrickCollision();
		}
	};
}