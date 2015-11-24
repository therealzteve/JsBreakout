var animations = [];

function fade(){
	var alpha = 1;
	
	var animation = function(){
		shape.fillColor.alpha -= fade.config.rate;

		if(shape.fillColor.alpha <= 0 ){
			animations.splice(animations.indexOf(animation), 1);
		}
	}
	animations.push(animation);
	
}
 

fade.config = {
	"rate" : 0.01
};

function lightning(){
	shape.fillColor = new Color(lightning.config.color);
}

lightning.config = {
	"color" : "white"	
};

function particles(){
	
	var explosionCircles = [];
	var x = 0
	var shake = true;
	var rdmX, rdmY;
	
		
		var position = result.position; 
		var test = new Shape.Circle(new Point(position.x, position.y-2), particles.config.colCircleSize);
		test.fillColor = 'black';
		
		var animation = function(){
			
			
			if(x < particles.config.amountCircleWaves){
				for(var i = 0; i<particles.config.amountCircles; i++){
					explosionCircles.push(Circle(position, ( Math.random()-0.5) *particles.config.circleXRate , (Math.random()-1.3 )* particles.config.circleYRate, particles.config.circleSize )) ;
				}
				
				x++;
			}
				
			for(var i = 0; i < explosionCircles.length; i++){
				explosionCircles[i].myTranslate();
				explosionCircles[i].fillColor.alpha = explosionCircles[i].fillColor.alpha - particles.config.circleFade;
				if(explosionCircles[i].fillColor.alpha <= 0){
					explosionCircles[i].remove();
					explosionCircles.splice(i,1);
				}
			}
			if(explosionCircles.length == 0){
				animations.splice(animations.indexOf(animation), 1);
			}
			
		} 
		animations.push(animation);
}

particles.config = 
	{
		"explosionColor":"white",
		"shakeFrames":25,
		"shakeStrength":7,
		"amountCircleWaves":9,
		"amountCircles":50,
		"colCircleSize":5,
		"brickFade":0.05,
		"circleSize":1,
		"circleXRate":3,
		"circleYRate":2,
		"circleFade":0.026
		}

function shake(){
	var y = shake.config.shakeFrames;
	
	var rdmX, rdmY;
	var state = 1;
	var animation = function(){
		if(y > 0 ){
			y--;

			if(state === 1){
				rdmX = Math.random()* shake.config.shakeStrength;
				rdmY = Math.random()*shake.config.shakeStrength;
				shape.translate(new Point(rdmX/2,rdmY/2));
				state++;
				return;
			}
			
			if(state === 2){
				var a = rdmX * (-1);
				var b = rdmY * (-1);
				shape.translate(new Point(a,b));
				state++;
				return;
			}
			
			if(state === 3){
				shape.translate(new Point(rdmX/2,rdmY/2));
				state = 1;
				return;
			}
		}
		else{
			animations.splice(animations.indexOf(animation), 1);
		}
	}
	animations.push(animation);

}

shake.config = {
		"shakeFrames" : 26,
		"shakeStrength" :7
}

function dashes(){
	var arcs = [];
	var alpha = dashes.config.initialAlpha;
	var radius = dashes.config.radius;
	var color = new Color(dashes.config.color);
	var positions = [];
	var angleBetweenDashes = dashes.config.spreadAngle/(dashes.config.amountDashes-1);
	//shape.fillColor.alpha = 0;
	
	for(var i = 0; i < dashes.config.amountDashes; i++){
		positions.push(new Point(result.position.x, result.position.y));
	}
	
	var animation = function(){
		
		for(var i = 0; i < arcs.length;i++){
			if(typeof arcs[i] !== 'undefined'){
				arcs[i].remove();
			}
		}
		arcs = [];
		
		
		for(var i = 0; i < dashes.config.amountDashes ; i++){
			arcs.push(Dash(
					positions[i],
					dashes.config.factor,
					radius,
					dashes.config.direction,
					color,
					dashes.config.flareSize,
					alpha));
			
			var winkel = (-1)*dashes.config.spreadAngle/2 + i * angleBetweenDashes;
			console.log(winkel);
			arcs[i].rotate(winkel);
			
			winkel = winkel * (Math.PI/180);
			var left = Math.sin(winkel);
			var top  = Math.cos(winkel);
			positions[i].y += dashes.config.moveSpeed*top;
			positions[i].x += dashes.config.moveSpeed*left*-1;
		}

		
		alpha = alpha - dashes.config.fadeRate;
		color.alpha = alpha;
		radius+=dashes.config.speed;
		if(alpha <= 0){
			for(var i = 0; i < arcs.length;i++){
				if(typeof arcs[i] !== 'undefined'){
					arcs[i].remove();
				}
			}
			animations.splice(animations.indexOf(animation), 1);
		}
	};
	animations.push(animation);

}

dashes.config = {
		amountDashes : 3,
		spreadAngle : 45,
		speed : 1,
		moveSpeed : 1,
		factor : 0.5,
		radius : 10,
		direction : 0,
		color : 'white',
		flareSize : 10,
		fadeRate : 0.05,
		initialAlpha : 1
}

function triangles(){
	
	var triangleList = [];
	var triangleMatrix = [];
	
	var amountTriangles = triangles.config.rows * triangles.config.columns;
	var rowSize = shape.size.height/(triangles.config.rows-1);
	var columnSize = shape.size.width/(triangles.config.columns-1);
	var stepY = 90/(triangles.config.rows-1);
	
	
	//Iterate rows
	for (var i = 0; i < triangles.config.rows; i++) {
		
		//calc currentStartWinkel
		var currentStartWinkel = 135+stepY*i;
		
		//Calc step X
		var stepX;
		if(currentStartWinkel < 180){
			stepX = ((currentStartWinkel-90)*2)/(triangles.config.columns-1);
		}else{
			stepX = ((270 - currentStartWinkel)*2)/(triangles.config.columns-1);
		}
		
		//calc yDirection
		var yDirectionFactor = -Math.sin(currentStartWinkel*(Math.PI/180));
		
		//iterate columns
		for (var j = 0; j < triangles.config.columns; j++) {
			
			
			//Calc winkel
			var winkel; 
			if(currentStartWinkel<180){
				winkel = currentStartWinkel - stepX*j;
			}else{
				winkel = currentStartWinkel + stepX*j;
			}
			winkel = winkel + Math.random()*triangles.config.randomDirectionFactor - triangles.config.randomDirectionFactor/2 
			
			//calc xDirection
			var xDirection = Math.cos(winkel*(Math.PI/180));
			
			var yDirection = Math.abs(Math.sin(winkel*(Math.PI/180)));
			yDirection = yDirectionFactor * yDirection;
			
			var direction = { x : xDirection, y : yDirection};
			var pos = {
					x : columnSize * j + shape.bounds.topLeft.x,
					y : rowSize * i + shape.bounds.topLeft.y
				};
			
			var rotation = triangles.config.rotation 
							+ (Math.random()*triangles.config.rotationRange)
							- triangles.config.rotationRange/2;
			
			var size = triangles.config.size + (Math.random()* triangles.config.randomSizeFactor) -triangles.config.randomSizeFactor/2;
			if(size <= 0){
				size = 1;
			}
			
			var speed = triangles.config.speed + (Math.random()* triangles.config.randomSpeedFactor) - triangles.config.randomSpeedFactor/2;
			
			var triangle = Triangle(pos, direction,
					size, speed, triangles.config.color, rotation);
			triangleList.push(triangle);
				triangle.draw();
			
		}
	}
	
	
	var frameCount = triangles.config.framesToWait;
	var animation = function(){
		if(frameCount <= 0 ){
			for(var i = 0; i < triangleList.length; i++){
				triangleList[i].alpha = triangleList[i].alpha - triangles.config.fade;
				triangleList[i].translate();
				if(triangleList[i].alpha <= 0){
					triangleList[i].remove();
					triangleList.splice(i,1);
				}
			}
		}
		frameCount--;
	};
	animations.push(animation);
}

triangles.config = {
	rows :	8,
	columns: 16,
	size : 1,
	randomSizeFactor : 15,
	color : "white",
	speed : 2,
	randomSpeedFactor : 3,
	fade : 0.2,
	gravity : 0, 
	rotation : 0,
	rotationRange : 90,
	framesToWait : 0,
	randomDirectionFactor: 90
	
};

function fog(){
	var urls = ['img/fog128_1.png', 'img/fog32_2.png', 'img/fog_32_3.png' , 'img/fog16.png'];
	//var urls = [];
	var rasters = [];
	
	for (var i = 0; i < fog.config.particleCount; i++) {
		var x = result.position.x + Math.random()*fog.config.width - fog.config.width/2;
		var y = result.position.y + Math.random()*fog.config.height - fog.config.height/2;
		var url = Math.floor(Math.random()*urls.length);
		var raster = new Raster({"source" : urls[url] , "position" : new Point(x, y)})
		raster.direction = new Point(fog.config.speed*Math.random() - fog.config.speed/2, fog.config.speed*Math.random() - fog.config.speed/2);
		rasters.push(raster);
	}

	var animation = function(){
		for(var i = 0; i < rasters.length; i++){
			rasters[i].rotate(fog.config.rotationSpeed * Math.random());
			rasters[i].translate(rasters[i].direction);
			rasters[i].opacity -= fog.config.fadeSpeed*Math.random();
			rasters[i].width += 1;
			rasters[i].height += 1;
			if(rasters[i].opacity <= 0){
				rasters[i].remove();
				rasters.splice(i,1);
				
				if(rasters.length === 0 ){
					animations.splice(animations.indexOf(animation), 1);
				}
			}
		}
	}
	animations.push(animation);
}

fog.config =  {
	width : 3,
	height : 3,
	speed : 1.2,
	rotationSpeed:2,
	particleCount :10,
	fadeSpeed : 0.01
};

function Triangle(position, direction, size,speed, color, rotation){
	var currentPosition = new Point(position.x, position.y);
	var currentRotation = rotation;
	var myColor = new Color(color);
	var speedX = direction.x * speed;
	var speedY = direction.y * speed;
	var triangle = {};
	triangle.path =  new Path.RegularPolygon(new Point(currentPosition.x, currentPosition.y), 3, size);
	triangle.alpha = 1;
	
	
	triangle.draw = function(){
		if(typeof triangle.path !== 'undefined'){
			triangle.path.remove();
		}
		triangle.path =  new Path.RegularPolygon(new Point(currentPosition.x, currentPosition.y), 3, size);
		triangle.path.fillColor = myColor;
		triangle.path.fillColor.alpha = triangle.alpha;
		triangle.path.rotate(currentRotation);
		//triangle.path.strokeColor = "white";
	}
	
	triangle.translate = function(){
		currentPosition.x += speedX;
		currentPosition.y += speedY;
		
		speedY += triangles.config.gravity;
		
		currentRotation += rotation;
		if(currentRotation >= 360){
			currentRotation -= 360;
		}
		triangle.draw();
	}
	
	triangle.remove = function(){
		triangle.path.remove();
	}
	
	return triangle;
}

function Circle(position, direction, yDirection, size){
	var ball = new Shape.Circle(new Point(position.x, position.y), Math.random()+size);
	var yDir = yDirection;
	ball.fillColor = '#FFFFFF';
	
	ball.myTranslate = function(){
		ball.translate( new Point(direction,yDir) );
		yDir = yDir + 0.2;
	}
	return ball;
};


function Dash(point,factor,radius,direction, color, flareSize, alpha){
	var p1 = new Point(point.x-radius, point.y);
	var p2 =  new Point(point.x, point.y + radius*factor);
	var p3 = new Point(point.x+radius, point.y);

	var centerPoint =  calculateMiddlePoint(point, radius, factor);
	var flareRate = 1 - flareSize / Math.abs(p1.getDistance(centerPoint));
	
	if(flareRate < 0){
		flareRate = 0;
	}
	
	arc = new paper.Path.Arc(p1, p2, p3) ;
	arc.strokeColor = new Color('white');
	arc.strokeColor.alpha = alpha;
	arc.fillColor = {
		gradient: {
			stops: [[new Color(0,0), flareRate], [color, 1]],
			        radial: true
			},
			origin: centerPoint,
			destination: p2
	};
	
	return arc;
} 	


function calculateMiddlePoint(p, radius, factor){
	 var y = -0.5 * radius / factor + p.y + 0.5 * radius * factor;
	 
	 return new Point(p.x, y);
}