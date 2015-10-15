function breakOutGame(){
	var game = {
			isPaused : pause,
			start : function(){
				campaignHandler.start();
			},
			stop : function(){
				
			}
	};
	var pause = false;
	var gameEventHandler = GameEventHandler(game);
	var campaignHandler = CampaignHandler(gameEventHandler);

	return game;
}

breakOutGame.notifyChange = function(){
	//Dummy function. Change it to hook an event for GUI Changes
};
