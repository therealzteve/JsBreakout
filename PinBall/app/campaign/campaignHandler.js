var CampaignHandler = function(gameEventHandler) {
	var current = 0;
	var campaignHandler;
	var score = Score();
	
	var evHandler = {
			"levelCompleted" : function() {
				campaignHandler.next();
			}
		};
	
	var ingameHandler = IngameHandler({
		"parentEventHandler" : evHandler,
		"scoreService" : ScoreService(score)
	});
	
	var storyHandler = StoryHandler({
		"parentEventHandler" : evHandler
	});
	
	// TODO put this in Data object
	var story = [ {
		"name" : "Prolog",
		"type" : "STORY"
	}, {
		"name" : "Level1",
		"type" : "LEVEL",
		"number" : 1
	} ];
	
	//loads an entry from the story object
	function load(){
		var currentState = story[current];
		
		if(currentState.type === 'LEVEL'){
			//Get the level and start it in the ingameHandler
			ingameHandler.start(currentState.number);
		}
		
		if(currentState.type === 'STORY'){
			//get the story and start the story handler
			storyHandler.start();
		}
	};
	
	campaignHandler =  {
		start : function(){
			current = 0;
			ingameHandler.init();
			load();
		},
		next : function(){
			current++;
			
			if(current == story.length){
				ingameHandler.stop();
				gameEventHandler.win();
			}else{
				load();
			}
		}
	}
	
	return campaignHandler;
}