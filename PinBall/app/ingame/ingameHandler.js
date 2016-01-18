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
		
		var stage = new createjs.Stage("myCanvas");
		stage.canvas.width = 800;
		stage.canvas.height = 300;
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", stage);
		
		
		// Model Variables
		var ball = Ball(stage);
		var gameObjects = [];
		var board = Board(stage);
		
		// Services and handlers
		var eventManager = EventManager(parentEventManager);
		var levelService = LevelService(gameObjects, stage, eventManager);
		var collisionService = CollisionService(gameObjects, ball, stage, eventManager);
	
		eventManager.registerListener(CollisionHandler(ball));
		gameObjects.push(board);
		
		var ingameHandler =  {
			
			init : function(){
			},
			start : function(levelNumber){
				
				// Load the first Level
				levelService.loadLevel(levelNumber);
	
				// Load Display the board and the ball and start it
				board.load();
				stage.addChild(board.getShape());
				stage.addChild(ball.getShape());
				ball.start();
				
				
				stage.addEventListener('tick', collisionService.checkForCollisions);
				// Start Collision Handler
				/*paper.view.onFrame = function(){
					collisionService.checkForCollisions();
				}*/
				
			},
			stop : function(){
				
				// Stop the ball and remove the level
				stage.removeChild(ball.getShape());
				stage.removeChild(board.getShape());
				levelService.destroy();
				
				
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