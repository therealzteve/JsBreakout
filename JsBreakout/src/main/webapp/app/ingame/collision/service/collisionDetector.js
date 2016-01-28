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
				
				if(ball.x < rect.x){
					// Ball is on the left side
					cX = rect.x;
				}else{
					if(ball.x > rect.x + rect.getBounds().width ){
						//Ball is on the right side
						cX = rect.x + rect.getBounds().width;
					}else{
						
						//Ball is between left and right side
						cX = ball.x;
						verticalHit = true;
					}
				}
				
				if(ball.y < rect.y){
					cY = rect.y;
				}else{
					if(ball.y > rect.y + rect.getBounds().height){
						cY = rect.y + rect.getBounds().height;
					}else{
						cY = ball.y;
					}
				}
				
				//If the closest point is inside the circle 
				if( distanceSquared( ball.x, ball.y, cX, cY ) < ball.radius * ball.radius ) {
					
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
