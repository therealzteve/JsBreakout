define( function(){
	
	function brick(brickData){
		var shape;
		
		var createShape = function(){
			var topLeft = new paper.Point(brickData.x,brickData.y);
			var rectSize = new paper.Size(50, 20);
			var rect = new paper.Rectangle(topLeft, rectSize);
			shape = new paper.Shape.Rectangle(rect);
			shape.fillColor = brickData.color;
		}
		
		return {
			create : function(){
				createShape();
			},
			getShape : function(){
				return shape;
			},
			handleHit : function(){
				this.destroy();
			},
			destroy : function(){
				shape.remove();
			},
			type : "brick",
			points : brickData.points,
		};
	}	
	return brick;
});
