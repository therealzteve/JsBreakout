/**
 * 
 */

function board(){
	var shape;
	
	var registerEvents = function(){
		var tool = new Tool();
		
		tool.onMouseMove = function(event){
			shape.position.x = event.point.x;
		};
	};
	
	var createShape = function(){
		var topLeft = new paper.Point(0, paper.view.size.height - 20);
		var rectSize = new paper.Size(60, 10);
		var rect = new paper.Rectangle(topLeft, rectSize);
		shape = new paper.Shape.Rectangle(rect);
		shape.fillColor = 'green';
	};
	
	return {
		load : function(){
			createShape();
			registerEvents();
		}
	};
}