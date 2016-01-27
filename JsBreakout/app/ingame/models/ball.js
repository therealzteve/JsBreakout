define( function(){
	function Ball(){
		var shape = new createjs.Shape();
		shape.graphics.beginFill("white").drawCircle(0, 0, 10);
		shape.x = 50;
		shape.y = 80;
		shape.radius = 10;
		
		var moveBall = function(){
			shape.x += myBall.direction.x * myBall.speed;
			shape.y += myBall.direction.y * myBall.speed;
		};
		
		var myBall = {
			getShape : function(){
				return shape;
			},
			speed : 3,
			direction : { x : 0 , y : 1 } , 
			start : function(){
				shape.addEventListener('tick',moveBall);
			},
			stop : function(){
				shape.removeEventListener('tick', moveBall);
			}
		};
		
		return myBall;
	}
	
	return Ball;
});
