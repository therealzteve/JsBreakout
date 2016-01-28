define(["app/ingame/collision/service/collisionDetector"], function(CollisionDetector){
	var CollisionService = function(objects, ball,stage, eventManager){
		var collisionDetector = CollisionDetector();
	
		
		function checkObjectCollision(){
			for(var i = 0 ;  i < objects.length ; i++){
				var result = collisionDetector.checkCollision(ball.getShape(), objects[i].getShape());
				if(result.collided){
					eventManager.event("HIT", 
						{collisionObject : objects[i],
						 collisionInfo : {
							 verticalHit : result.verticalHit,
							 position : {'x' : ball.getShape().x, 'y' :  ball.getShape().y}
						 }
						});
				}
			}
		};
		
		function checkWallCollision(){
			
			if(ball.getShape().y < 0){
				eventManager.event("WALL_HIT", 
					{collisionInfo : {verticalHit : true, side: "top"}}
				);
			}
			
			if(ball.getShape().x < 0 || ball.getShape().x > stage.canvas.width){
				eventManager.event("WALL_HIT", 
						{collisionInfo : {verticalHit : false}}
					);
			}
			
			if(ball.getShape().y > stage.canvas.height){
				eventManager.event("WALL_HIT", 
						{collisionInfo : {verticalHit : true, side : "bottom"}}
					);
			}
			
		};
		
		return {
			checkForCollisions : function(){
				checkWallCollision();
				checkObjectCollision();
			}
		};
	};
	
	return CollisionService;
});