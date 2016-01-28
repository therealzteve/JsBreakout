var animations = [];


// --- FADE

function fade(){
	//var alpha = 1;
	var animation = function(){
		brick.alpha -= fade.config.rate;

		if(brick.alpha <= 0 ){
			animations.splice(animations.indexOf(animation), 1);
		}
	}
	animations.push(animation);
	
}
 

fade.config = {
	"rate" : 0.01
};


// END FADE

// LIGHTNING

function lightning(){
	brick.graphics.beginFill(lightning.config.color).drawRect(0,0,50,20);
}

lightning.config = {
	"color" : "white"	
};

function particles(){
	
	var explosionCircles = [];
	var x = 0
	var rdmX, rdmY;
	
		
		var position = result.position; 
		var test = new createjs.Shape();
		test.graphics.beginFill('black').drawCircle(0,0,particles.config.colCircleSize);
		test.x = position.x;
		test.y = position.y-2;
		test.fillColor = 'black';
		
		var animation = function(){
			
			
			if(x < particles.config.amountCircleWaves){
				for(var i = 0; i<particles.config.amountCircles; i++){
					var circle = Circle(position, ( Math.random()-0.5) *particles.config.circleXRate , (Math.random()-1.3 )* particles.config.circleYRate, particles.config.circleSize );
					stage.addChild(circle);
					explosionCircles.push(circle);
				}
				
				x++;
			}
				
			for(var i = 0; i < explosionCircles.length; i++){
				explosionCircles[i].myTranslate();
				explosionCircles[i].alpha = explosionCircles[i].alpha - particles.config.circleFade;
				if(explosionCircles[i].alpha <= 0){
					stage.removeChild(explosionCircles[i]);
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
	var state = 0;
	var shakeX;
	var shakeY;
	var states = [];
	
	states.push(function(){
		rdmX = Math.random()* shake.config.shakeStrength;
		rdmY = Math.random()*shake.config.shakeStrength;
		shakeX = rdmX/2;
		shakeY = rdmY/2;
		state++;
	});
	
	states.push(function(){
		shakeX =  rdmX * (-1);
		shakeY = rdmY * (-1);
		state++;
	});
	
	states.push(function(){
		shakeX  = rdmX/2;
		shakeY = rdmY/2;
		state = 0;
	});
	
	var animation = function(){
		if(y > 0 ){
			y--;
			
			states[state]();
			brick.x = brick.x + shakeX;
			brick.y = brick.y + shakeY;
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
	var color = dashes.config.color;
	var positions = [];
	var angleBetweenDashes = dashes.config.spreadAngle/(dashes.config.amountDashes-1);
	//shape.fillColor.alpha = 0;
	
	for(var i = 0; i < dashes.config.amountDashes; i++){
		positions.push({'x':result.position.x, 'y' : result.position.y});
	}
	
	var animation = function(){
		
		for(var i = 0; i < arcs.length;i++){
			if(typeof arcs[i] !== 'undefined'){
				stage.removeChild(arcs[i]);
			}
		}
		arcs = [];
		
		
		for(var i = 0; i < dashes.config.amountDashes ; i++){
			var arc = Dash(
					positions[i],
					dashes.config.factor,
					radius,
					dashes.config.direction,
					color,
					dashes.config.flareSize,
					alpha);
			arcs.push(arc);
			stage.addChild(arc);
			
			var winkel = (-1)*dashes.config.spreadAngle/2 + i * angleBetweenDashes;
			arcs[i].rotation = winkel;
			
			winkel = winkel * (Math.PI/180);
			var left = Math.sin(winkel);
			var top  = Math.cos(winkel);
			positions[i].y += dashes.config.moveSpeed*top;
			positions[i].x += dashes.config.moveSpeed*left*-1;
		}

		
		alpha = alpha - dashes.config.fadeRate;
		radius+=dashes.config.speed;
		if(alpha <= 0){
			for(var i = 0; i < arcs.length;i++){
				if(typeof arcs[i] !== 'undefined'){
					stage.removeChild(arcs[i]);
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
	var rowSize = brick.getBounds().height/(triangles.config.rows-1);
	var columnSize = brick.getBounds().width/(triangles.config.columns-1);
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
					x : columnSize * j + brick.x,
					y : rowSize * i + brick.y
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
			stage.addChild(triangle.path);
			triangle.draw();
			triangleList.push(triangle);
		}
	}
	
	
	var frameCount = triangles.config.framesToWait;
	var animation = function(){
		if(frameCount <= 0 ){
			for(var i = 0; i < triangleList.length; i++){
				triangleList[i].alpha = triangleList[i].alpha - triangles.config.fade;
				triangleList[i].translate();
				if(triangleList[i].alpha <= 0){
					stage.removeChild(triangleList[i]);
					triangleList.splice(i,1);
				}
			}
		}
		frameCount--;
	};
	animations.push(animation);
}

triangles.config = {
	rows :	2,
	columns: 4,
	size : 1,
	randomSizeFactor : 15,
	color : "white",
	speed : 2,
	randomSpeedFactor : 3,
	fade : 0.05,
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
		var raster = new createjs.Bitmap(urls[url]);
		raster.x  = x;
		raster.y = y;
		raster.regX = raster.image.width /2;
		raster.regY = raster.image.height /2;
		raster.direction = { 'x' : fog.config.speed*Math.random() - fog.config.speed/2,'y' :  fog.config.speed*Math.random() - fog.config.speed/2};
		rasters.push(raster);
		stage.addChild(raster);
	}

	var animation = function(){
		for(var i = 0; i < rasters.length; i++){
			rasters[i].rotation += fog.config.rotationSpeed * Math.random();
			rasters[i].x = rasters[i].x + rasters[i].direction.x;
			rasters[i].y = rasters[i].y + rasters[i].direction.y;
			rasters[i].alpha -= fog.config.fadeSpeed*Math.random();
			rasters[i].scaleX += 1 / rasters[i].image.width ;
			rasters[i].scaleY += 1 / rasters[i].image.height;
			if(rasters[i].alpha <= 0){
				stage.removeChild(rasters[i]);
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
	fadeSpeed : 0.1
};

function Triangle(position, direction, size,speed, color, rotation){
	var currentPosition = position;
	var currentRotation = rotation;
	var speedX = direction.x * speed;
	var speedY = direction.y * speed;
	var triangle = {};
	triangle.path = new createjs.Shape();
	triangle.alpha = 1;
	
	
	triangle.draw = function(){
		triangle.path.graphics.beginFill(color).drawPolyStar(0,0,size, 3);
		triangle.path.x = currentPosition.x;
		triangle.path.y = currentPosition.y;
		triangle.path.alpha = triangle.alpha;
		triangle.path.rotation = currentRotation;
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
	
	
	
	return triangle;
}

function Circle(position, direction, yDirection, size){
	var ball = new createjs.Shape();
	ball.graphics.beginFill("#FFFFFF").drawCircle(0,0,Math.random() + size);
	ball.x = position.x;
	ball.y = position.y;
	var yDir = yDirection;
	
	ball.myTranslate = function(){
		ball.x = ball.x + direction;
		ball.y = ball.y + yDir;
		yDir = yDir + 0.2;
	}
	return ball;
};


function Dash(point,factor,radius,direction, color, flareSize, alpha){
	//var p1 = new Point(point.x-radius, point.y);
	//var p2 =  new Point(point.x, point.y + radius*factor);
	//var p3 = new Point(point.x+radius, point.y);

	//var centerPoint =  calculateMiddlePoint(point, radius, factor);
	//var flareRate = 1 - flareSize / Math.abs(p1.getDistance(centerPoint));
	
	//if(flareRate < 0){
	//	flareRate = 0;
	//}
	
	arc = new createjs.Shape();
	console.log("test");
	arc.graphics
	.beginStroke('white').beginRadialGradientFill(["rgba(0,0,0,0)","#00F"], [0, 1], radius/2, -radius, radius*0.9, radius/2, -radius, radius).arc(radius/2,-radius,radius,45*(Math.PI/180), 135*(Math.PI/180) );
	//arc.graphics.beginStroke('white').drawRect(0,0,20,40);
	arc.x = point.x;
	arc.y = point.y;
	
	arc.regX = radius/2;
	arc.alpha = alpha;
	//arc.regY = point.y-radius;
//	arc.strokeColor.alpha = alpha;
//	arc.fillColor = {
//		gradient: {
//			stops: [[new Color(0,0), flareRate], [color, 1]],
//			        radial: true
//			},
//			origin: centerPoint,
//			destination: p2
//	};
	
	return arc;
} 	


function calculateMiddlePoint(p, radius, factor){
	 var y = -0.5 * radius / factor + p.y + 0.5 * radius * factor;
	 
	 return new Point(p.x, y);
}