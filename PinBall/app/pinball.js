var topLeft = new Point(0, view.size.height - 20);
var rectSize = new Size(60, 10);
var rect = new Rectangle(topLeft, rectSize);


var realRect = new Shape.Rectangle(rect);
realRect.fillColor = 'green';

function onMouseMove(event) {
    // Add a point to the path every time the mouse is dragged
	realRect.position.x = event.point.x;
}

var ball = new Shape.Circle(new Point(80, 50), 10);
ball.strokeColor = 'black';
var speed = 4;
var left = 0;
var top = speed;

function checkCollision(ball, pad){
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
	function distanceSquared(x1, y1, x2,y2){
		var deltaX = x2 - x1; 
		var deltaY = y2 - y1; 
		return deltaX*deltaX + deltaY*deltaY;
	}


function onFrame(){
	var dist = ball.position.getDistance(realRect.position);
	
	if(ball.position.y < 0){
		top = top* (-1);
	}
	
	if(ball.position.x < 0){
		left = left* (-1);
	}
	
	if(ball.position.x > view.viewSize.width){
		left = left* (-1);
	}
	
	if(checkCollision(ball, realRect)){
		var winkel = (ball.position.x - realRect.position.x)*1.5;
		winkel = winkel * (Math.PI/180);
		left = Math.sin(winkel) * speed;
		top  = Math.cos(winkel) * speed * (-1);
	}
	
	ball.translate(new Point(left,top));
}