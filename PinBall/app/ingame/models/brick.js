define(["app/ingame/models/animations/particles"], function(animation){
	
	function brick(brickData){
		var container = new createjs.Container();
		container.x = brickData.x;
		container.y = brickData.y;
		container.setBounds(0,0,50,20);

		var shape = new createjs.Shape();
		shape.graphics.beginFill(brickData.color).drawRect(0,0,50,20);
		container.addChild(shape);
		
		
		return {
			getShape : function(){
				return container;
			},
			handleHit : function(hitPosition){
				shape.alpha = 0;
				animation(container,container.globalToLocal(hitPosition.x, hitPosition.y),this.destroy);
			},
			destroy : function(){
				shape.parent.removeChild(shape);
			},
			type : "brick",
			points : brickData.points,
		};
	}	
	return brick;
});
