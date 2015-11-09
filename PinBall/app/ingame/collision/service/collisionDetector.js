define(function(){
	function CollisionDetector(){
		
		function distanceSquared(x1, y1, x2,y2){
			var deltaX = x2 - x1; 
			var deltaY = y2 - y1; 
			return deltaX*deltaX + deltaY*deltaY;
		}
		
		return {
			checkCollision : function(ball, rect){
				var cX, xY;
				var verticalHit = false;
				
				if(ball.position.x < rect.bounds.left){
					// Ball is on the left side
					cX = rect.bounds.left;
				}else{
					if(ball.position.x > rect.bounds.left + rect.size.width ){
						//Ball is on the right side
						cX = rect.bounds.left + rect.size.width;
					}else{
						
						//Ball is between left and right side
						cX = ball.position.x;
						verticalHit = true;
					}
				}
				
				if(ball.position.y < rect.bounds.top){
					cY = rect.bounds.top;
				}else{
					if(ball.position.y > rect.bounds.top + rect.size.height){
						cY = rect.bounds.top + rect.size.height;
					}else{
						cY = ball.position.y;
					}
				}
				
				//If the closest point is inside the circle 
				if( distanceSquared( ball.position.x, ball.position.y, cX, cY ) < ball.radius * ball.radius ) {
					
					//This box and the circle have collided 
					return { collided : true, verticalHit : verticalHit }; 
				} 
				//If the shapes have not collided 
				return { collided : false };
			}
		};
	};
	
	return CollisionDetector;
});
