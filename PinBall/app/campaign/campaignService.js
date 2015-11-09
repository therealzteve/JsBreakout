define(
		["app/score/models/score",
		 "app/ingame/ingameHandler",
		 "app/story/storyService",
		 "app/event/eventManager",
		 "app/campaign/campaignEventHandler"],
		function(Score, IngameHandler, StoryService, EventManager, CampaignEventHandler){
	
	var CampaignService = function() {

		var current = 0;
		var score = Score();
		var campaignEventManager = EventManager();
		
		var ingameHandler = IngameHandler(campaignEventManager);
		var storyService = StoryService(campaignEventManager);
		
		// TODO put this in Data object
		var story = [ {
			"name" : "Prolog",
			"type" : "STORY"
		}, {
			"name" : "Level1",
			"type" : "LEVEL",
			"number" : 0
		},
			{
				"name" : "Level2",
				"type" : "LEVEL",
				"number" : 1
			}];
		
		//loads an entry from the story object
		function load(){
			var currentState = story[current];
			
			if(currentState.type === 'LEVEL'){
				//Get the level and start it in the ingameHandler
				ingameHandler.start(currentState.number);
			}
			
			if(currentState.type === 'STORY'){
				//get the story and start the story handler
				storyService.start();
			}
		};
		
		var campaignService =  {
			start : function(){
				current = 0;
				ingameHandler.init();
				load();
			},
			next : function(){
				if(story[current].type === "LEVEL" ){
					ingameHandler.stop();
				}
				
				current++;
				if(current == story.length){
					// WON!
					
					//gameEventHandler.win();
				}else{
					load();
				}
			}
		}
		
		campaignEventManager.registerListener(CampaignEventHandler(campaignService));
		
		return campaignService;
	}

	return CampaignService;
});