define(["app/event/eventListener", "app/ingame/collision/service/ballDirectionService"],function(EventListener, BallDirectionService){ 
	
	var CollisionHandler = function(ball){

		var ballDirectionService = BallDirectionService(ball);
		
		
		//TODO put that in seperate object
		//Change direction generally
		function changeBallDirection(collisionInfo){
			
			if(collisionInfo.verticalHit){
				ball.direction.y = ball.direction.y *-1;
			}else{
				ball.direction.x = ball.direction.x *-1;
			}
			
		}
		
		var listener = EventListener();
	
		listener.handlers.HIT = function(eventData){
			changeBallDirection(eventData.collisionInfo);
			
			if(eventData.collisionObject.type === "pad"){
				ball.direction = ballDirectionService.calculate(eventData.collisionObject.getShape());
			}
						
		};
		
		listener.handlers.WALL_HIT = function(eventData){
			changeBallDirection(eventData.collisionInfo);
		}
	
		return listener;
	};
	
	return CollisionHandler;
});