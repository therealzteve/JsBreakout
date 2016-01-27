define(function(){
	function level(levelData,stage){

		return {
			level : new createjs.Container(),
			objects : levelData,
			create : function(){
				stage.addChild(this.level);
				for(var i = 0 ; i < this.objects.length ; i++){
					this.level.addChild(this.objects[i].getShape());
				}
			},
			destroy : function(){
				stage.removeChild(this.level);
				for( var i = 0 ; i < this.objects.length ; i++){
					this.level.removeChild(this.objects[i].getShape());
				}
			}
		};
	};

	return level;

});
