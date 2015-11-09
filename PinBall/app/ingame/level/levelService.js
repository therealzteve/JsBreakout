define(["app/ingame/models/brick", "app/ingame/models/level", "app/ingame/level/levelEventHandler"],function(brick, level, LevelEventHandler){
	function LevelService(objects, eventManager){
		var levels = [];
		var index = 0;
		var currentBricks = [];
		var currentLevel;
		
		// TODO put that in data
		var level1 = [brick({x : 10, y : 10, color: 'green', points: 10}), brick({x : 100, y : 10, color: 'red', points : 20})];
		var level2 = [brick({x : 150, y : 10, color: 'blue', points: 10}), brick({x : 250, y : 30, color: 'red', points : 20})];
		levels.push(level(level1));
		levels.push(level(level2));

		function loadLevel(){
			currentLevel = levels[index];
			currentLevel.create();
			
			for(var i = 0; i < currentLevel.objects.length; i++ ){
				objects.push(currentLevel.objects[i]);
				currentBricks.push(currentLevel.objects[i]);
			}
		}
		
		var levelService = {
			loadLevel : function(idx){
				index = idx;
				loadLevel();
			}, 
			loadNextLevel : function(){
				index++;
				loadLevel();
			},
			getBricks : function(){
				return currentBricks;
			},
			destroy : function(){
				currentLevel.destroy();
			},
			isLastLevel : function(){
				return (index === levels.length -1);
			},
			remove : function(object){
				currentBricks = _.without(currentBricks, object);
				
				var index = objects.indexOf(object);
				if(index > -1){
					objects.splice(index,1);
				}
				
				if(currentBricks.length === 0 ){
					eventManager.event("LEVEL_COMPLETED");
				}
				
			}
		};
		
		eventManager.registerListener(LevelEventHandler(levelService));
		
		return levelService;
	};
	
	return LevelService;
})



