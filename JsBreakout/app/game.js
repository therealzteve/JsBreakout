define( function(require){
	var CampaignHandler = require("app/campaign/campaignService");
	var UIService = require("app/gui/UIService");
	
	var game = {
			isPaused : pause,
			start : function(){
				campaignHandler.start();
			},
			stop : function(){
				
			}
	};
		
	var pause = false;
	
	var uiService = UIService(game);
	var campaignHandler = CampaignHandler();

	game.notifyChange = function(){
		//Dummy function. Change it to hook an event for GUI Changes
	};

	
	
	//return game;
});