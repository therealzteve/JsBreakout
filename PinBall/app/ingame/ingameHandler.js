var ingameHandler = function(){
	
	// Model Variables
	var ballInstance = ball();
	var boardInstance = board();
	
	// Services and handlers
	var levelHandler = LevelHandler();
	var colService = collisionService();
	var ballCollisionHandler;
	var brickService;  

	return {
		
		init : function(){
			
			// Init Paper & Canvas
			paper.install(window);
			paper.setup(document.getElementById("myCanvas"));
			
			// init services and models
			brickService = BrickService(levelHandler.getBricks(), scoreService, gameEventHandler);
			ballCollisionHandler = BallCollisionHandler(ballInstance, boardInstance, brickService, view, gameEventHandler);
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
			ballInstance.stop();
			levelHandler.destroy();
			
			// Stop collisionHandler
			paper.view.onFrame = function(){
				
			}
		}
	}
	
}