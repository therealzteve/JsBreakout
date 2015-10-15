function breakOutGame(){

	var campaignHandler = CampaignHandler();
	var pause = false;
	
	var game = {
			isPaused : pause,
			start : function(){
				campaignHandler.start();
			},
			stop : function(){
				
			}
	};
	var gameEventHandler = GameEventHandler(game);

	return game;
}

breakOutGame.notifyChange = function(){
	//Dummy function. Change it to hook an event for GUI Changes
};
