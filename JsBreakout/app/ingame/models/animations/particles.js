define(function() {
	

	function particles(container,position, callback) {
		var animationContainer = createAnimationContainer();
		var explosionCircles = [];
		var currentCircleWaveIndex = 0
		var hitBall = createHitBall();
		
		container.addChild(animationContainer);
		animationContainer.addChild(hitBall);
		
		
		var animation = function() {

			if(shouldCreateAnotherWave()){
				createCircleWave();
			}

			processCircles();
			
			if(animationFinished()){
				endAnimation();
			}
		}
		
		startAnimation();
		
		
		function createAnimationContainer(){
			var container = new createjs.Container();
			return container;
		}
		
		function animationFinished(){
			return (explosionCircles.length == 0);
		}
		
		function startAnimation(){
			animationContainer.addEventListener('tick',animation);
		}
		
		function endAnimation(){
			animationContainer.removeEventListener('tick',animation);
			callback();
		}
		
		
		function shouldCreateAnotherWave(){
			if(currentCircleWaveIndex < particles.config.amountCircleWaves){
				currentCircleWaveIndex++;
				return true;
			}
			return false;
		}
		
		function processCircles(){
			for(var i = 0; i < explosionCircles.length; i++){
				moveCircle(explosionCircles[i]);
				fadeCircle(explosionCircles[i]);
				
			}
		}
		
		function moveCircle(circle){
			circle.myTranslate();
		}
		
		function fadeCircle(circle){
			circle.alpha = circle.alpha - particles.config.circleFade;
			if(circle.alpha <= 0){
				animationContainer.removeChild(circle);
				var index = explosionCircles.indexOf(circle);
				explosionCircles.splice(index,1);
			}
		}
		
		function createCircleWave(){
			for (var i = 0; i < particles.config.amountCircles; i++) {
				var circle = createCircle();
				animationContainer.addChild(circle);
				explosionCircles.push(circle);
			}
		}
		
		function createCircle(){
			var direction = { 
					'x'  : (Math.random() - 0.5)* particles.config.circleXRate,
					'y' : (Math.random() - 1.3)* particles.config.circleYRate
			}
			
			var circle = createParticle(
							position, 
							direction,
							particles.config.circleSize
						);
			
			return circle;
		}
		
		function createHitBall(){
			var hitBall = new createjs.Shape();
			hitBall.graphics.beginFill('black').drawCircle(0, 0,
					particles.config.colCircleSize);
			hitBall.x = position.x;
			hitBall.y = position.y - 2;
			hitBall.fillColor = 'black';
			
			return hitBall;
		}
		
		function createParticle(position, direction, size){
			var gravity = 0.2;
			var particle = new createjs.Shape();
			particle.graphics.beginFill("#FFFFFF").drawCircle(0,0,Math.random() + size);
			particle.x = position.x;
			particle.y = position.y;
			
			
			particle.myTranslate = function(){
				particle.x = particle.x + direction.x;
				particle.y = particle.y + direction.y;
				direction.y += gravity;
			}
			
			return particle;
		};
	}
	
	particles.config = 
	{
		"explosionColor":"white",
		"amountCircleWaves":3,
		"amountCircles":10,
		"colCircleSize":5,
		"brickFade":0.05,
		"circleSize":1,
		"circleXRate":4,
		"circleYRate":4,
		"circleFade":0.026
		}
	
	return particles;
})