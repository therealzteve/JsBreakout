var IngameHandler = function(options){
	var pause = false;
	
	// Model Variables
	var ballInstance = ball();
	var boardInstance = board();
	
	// Services and handlers
	var levelHandler = LevelHandler();
	var colService = collisionService();
	var ballCollisionHandler;
	var brickService;  

	
	var ingameHandler =  {
		
		init : function(){
			
			// Init Paper & Canvas
			paper.install(window);
			paper.setup(document.getElementById("myCanvas"));
			
			// init services and models
			brickService = BrickService(levelHandler.getBricks(),options.scoreService, ingameEventHandler);
			ballCollisionHandler = BallCollisionHandler(ballInstance, boardInstance, brickService, view, ingameEventHandler);
			keyEventHandler.registerEvents();
		},
		start : function(levelNumber){
			
			// Load the first Level
			levelHandler.loadLevel(levelNumber);

			// Load Display the board and the ball and start it
			boardInstance.load();
			ballInstance.load();
			ballInstance.start();
			
			// Start Collision Handler
			paper.view.onFrame = function(){
				ballCollisionHandler.handleCollisions();
			}
			
		},
		stop : function(){
			
			// Stop the ball and remove the level
			ballInstance.destroy();
			boardInstance.destroy();
			levelHandler.destroy();
			
			// Stop collisionHandler
			paper.view.onFrame = function(){
				
			}
			
			keyEventHandler.deRegisterEvents();

		}, pause : function(){
			console.log("pause!");
			if(!pause){
				ballInstance.stop();
				boardInstance.stop();
			}else{
				ballInstance.start();
				boardInstance.start();
			}
			
			pause = !pause;
		}
	}
	
	var ingameEventHandler = IngameEventHandler(ingameHandler,options.parentEventHandler);
	var keyEventHandler = KeyEventHandler(ingameEventHandler);
	
	return ingameHandler;
	
}