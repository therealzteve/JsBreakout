function ScoreService(score){
	
	function addPoints(points){
		score.points = score.points + points;
		breakOutGame.notifyChange(); 
	}
	
	return {
		addPoints : function(points){
			addPoints(points);
		}
	}
}