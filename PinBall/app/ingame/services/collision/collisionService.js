/**
 * 
 */

function collisionService(){
	
	function distanceSquared(x1, y1, x2,y2){
		var deltaX = x2 - x1; 
		var deltaY = y2 - y1; 
		return deltaX*deltaX + deltaY*deltaY;
	}
	
	return {
		checkCollision : function(ball, pad){
			var cX, xY;
			
			if(ball.position.x < pad.bounds.left){
				cX = pad.bounds.left;
			}else{
				if(ball.position.x > pad.bounds.left + pad.size.width ){
					cX = pad.bounds.left + pad.size.width;
				}else{
					cX = ball.position.x;
				}
			}
			
			if(ball.position.y < pad.bounds.top){
				cY = pad.bounds.top;
			}else{
				if(ball.position.y > pad.bounds.top + pad.size.height){
					cY = pad.bounds.top + pad.size.height;
				}else{
					cY = ball.position.y;
				}
			}
			
			//If the closest point is inside the circle 
			if( distanceSquared( ball.position.x, ball.position.y, cX, cY ) < ball.radius * ball.radius ) {
				//This box and the circle have collided 
				return true; 
			} 
			//If the shapes have not collided 
			return false;
		}
	};
}