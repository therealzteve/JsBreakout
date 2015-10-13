function breakOutGame(){

	// Model Variables
	var ballInstance = ball();
	var boardInstance = board();
	var score = Score();
	var bricks = [];
	
	// Services and handlers
	var levelHandler = LevelHandler();
	var colService = collisionService();
	var scoreService = ScoreService(score);
	var ballCollisionHandler;
	var brickService;  
	
	var pause = false;
	
	var game = {
			score : score,
			levelHandler : levelHandler,
			isPaused : pause,
			init : function(){
				
				// Init Paper & Canvas
				paper.install(window);
				paper.setup(document.getElementById("myCanvas"));
				
				// init services and models
				brickService = BrickService(levelHandler.getBricks(), scoreService, gameEventHandler);
				ballCollisionHandler = BallCollisionHandler(ballInstance, boardInstance, brickService, view, gameEventHandler);
			},
			start : function(){
				
				// Load the first Level
				levelHandler.loadLevel(0);

				// Load Display the board and the ball and start it
				boardInstance.load();
				ballInstance.load();
				ballInstance.start();
				
				// Start Collision Handler
				paper.view.onFrame = function(){
					ballCollisionHandler.handleCollisions();
				}
				
			},
			pause : function(){
				
				// If game is not paused
				if(!pause){
					ballInstance.stop();
					boardInstance.stop();
					
				// If game is paused	
				}else{
					ballInstance.start();
					boardInstance.start();
				}
				
				// Switch state and notify GUI
				pause = !pause;
				this.isPaused = !this.isPaused;
				breakOutGame.notifyChange();
			},
			stop : function(){
				
				// Stop the ball and remove the level
				ballInstance.stop();
				levelHandler.destroy();
				
				// Stop collisionHandler
				paper.view.onFrame = function(){
					
				}
			}
	};
	
	var gameEventHandler = GameEventHandler(game);

	
	return game;
}

breakOutGame.notifyChange = function(){
	//Dummy function. Change it to hook an event for GUI Changes
};
