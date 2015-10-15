
function ball(){
	var ball;
	var createShape = function(){
		ball = new Shape.Circle(new Point(80, 50), 10);
		ball.strokeColor = 'black';
	};
	
	
	
	var myBall = {
		getShape : function(){
			return ball;
		},
		speed : 5,
		direction : { x : 0 , y : 1 } , 
		load : function(){
			createShape();
		},
		start : function(){
			ball.onFrame = function(){
				ball.translate(
						new Point(
								myBall.direction.x * myBall.speed,
								myBall.direction.y * myBall.speed
								)
						);
			}
		},
		stop : function(){
			ball.onFrame = function(){
				
			};
		},
		destroy : function(){
			ball.remove();
		}
	};
	
	return myBall;
}