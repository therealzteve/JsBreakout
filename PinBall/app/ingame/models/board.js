define(function(){
	function Board(stage){
		var shape = new createjs.Shape();
		shape.graphics.beginFill('green').drawRect(0,0,60,10);
		shape.x = 0;
		shape.y = stage.canvas.height-20;
		
		shape.setBounds(0,0,60,10);
		
		
		var changePosition = function(event){
			shape.x = event.stageX;
		};
		
		var registerEvents = function(){
			stage.addEventListener('stagemousemove',changePosition);
		};
		
		var deRegisterEvents = function(){
			stage.removeEventListener('stagemousemove',changePosition);
		};
		
//		var createShape = function(){
//			var topLeft = new paper.Point(0, paper.view.size.height - 20);
//			var rectSize = new paper.Size(60, 10);
//			var rect = new paper.Rectangle(topLeft, rectSize);
//			shape = new paper.Shape.Rectangle(rect);
//			shape.fillColor = 'green';
//		};
		
		return {
			getShape : function(){return shape;},
			load : function(){
				registerEvents();
			},
			stop : function(){
				deRegisterEvents();
			},
			start : function(){
				registerEvents();
			},
			type : "pad",
			handleHit : function(){
				
			}
		};
	};
	
	return Board;
});
