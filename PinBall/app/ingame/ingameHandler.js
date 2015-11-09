define(
		["app/ingame/models/ball",
		 "app/ingame/models/board",
		 "app/ingame/level/levelService",
		 "app/event/eventManager",
		 "app/ingame/collision/collisionService",
		 "app/ingame/collision/collisionHandler"] ,
		function(Ball, Board, LevelService, EventManager, CollisionService, CollisionHandler){
	
	
	var IngameHandler = function(parentEventManager){

		var pause = false;
		
		// Model Variables
		var ball = Ball();
		var gameObjects = [];
		var board = Board();
		
		// Services and handlers
		var eventManager = EventManager(parentEventManager);
		var levelService = LevelService(gameObjects, eventManager);
		var collisionService = CollisionService(gameObjects, ball, eventManager);
	
		eventManager.registerListener(CollisionHandler(ball));
		gameObjects.push(board);
		
		var ingameHandler =  {
			
			init : function(){
				
				// Init Paper & Canvas
				paper.install(window);
				paper.setup(document.getElementById("myCanvas"));
				
				// init services and models
				//keyEventHandler.registerEvents();
			},
			start : function(levelNumber){
				
				// Load the first Level
				levelService.loadLevel(levelNumber);
	
				// Load Display the board and the ball and start it
				board.load();
				ball.load();
				ball.start();
				
				// Start Collision Handler
				paper.view.onFrame = function(){
					collisionService.checkForCollisions();
				}
				
			},
			stop : function(){
				
				// Stop the ball and remove the level
				ball.destroy();
				board.destroy();
				levelService.destroy();
				
				// Stop collisionHandler
				paper.view.onFrame = function(){
					
				}
				
				//keyEventHandler.deRegisterEvents();
	
			}, pause : function(){
				console.log("pause!");
				if(!pause){
					ball.stop();
					board.stop();
				}else{
					ball.start();
					board.start();
				}
				
				pause = !pause;
			}
		}
		
		//	var ingameEventHandler = IngameEventHandler(ingameHandler,options.parentEventHandler);
		//	var keyEventHandler = KeyEventHandler(ingameEventHandler);
		
		return ingameHandler;
		
	}
	
	return IngameHandler;
});