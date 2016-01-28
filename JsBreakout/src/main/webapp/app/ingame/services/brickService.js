function BrickService(bricks, scoreService, gameEventHandler){
	
	return {
		hit : function(brick){
			
			scoreService.addPoints(brick.points);
			
			brick.hit();
			var index = bricks.indexOf(brick);
			if (index > -1) {
			    bricks.splice(index, 1);
			}
			if(bricks.length === 0){
				gameEventHandler.levelCompleted();
			}
		},
		getBricks : function(){
			return bricks;
		}
	}
}