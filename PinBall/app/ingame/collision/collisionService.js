define(["app/ingame/collision/service/collisionDetector"], function(CollisionDetector){
	var CollisionService = function(objects, ball, eventManager){
		var collisionDetector = CollisionDetector();
	
		
		function checkObjectCollision(){
			for(var i = 0 ;  i < objects.length ; i++){
				var result = collisionDetector.checkCollision(ball.getShape(), objects[i].getShape());
				
				if(result.collided){
					eventManager.event("HIT", 
						{collisionObject : objects[i],
						 collisionInfo : {verticalHit : result.verticalHit}
						});
				}
			}
		};
		
		function checkWallCollision(){
			
			if(ball.getShape().position.y < 0){
				eventManager.event("WALL_HIT", 
					{collisionInfo : {verticalHit : true, side: "top"}}
				);
			}
			
			if(ball.getShape().position.x < 0 || ball.getShape().position.x > view.viewSize.width){
				eventManager.event("WALL_HIT", 
						{collisionInfo : {verticalHit : false}}
					);
			}
			
			if(ball.getShape().position.y > view.viewSize.height){
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