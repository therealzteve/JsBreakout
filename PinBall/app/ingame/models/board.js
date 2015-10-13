/**
 * 
 */

function board(){
	var shape;
	
	var tool = new paper.Tool();
	
	var registerEvents = function(){
		tool.onMouseMove = function(event){
			shape.position.x = event.point.x;
		};
	};
	
	var deRegisterEvents = function(){
		tool.onMouseMove = function(){};
	};
	
	var createShape = function(){
		var topLeft = new paper.Point(0, paper.view.size.height - 20);
		var rectSize = new paper.Size(60, 10);
		var rect = new paper.Rectangle(topLeft, rectSize);
		shape = new paper.Shape.Rectangle(rect);
		shape.fillColor = 'green';
	};
	
	return {
		getShape : function(){return shape;},
		load : function(){
			createShape();
			registerEvents();
		},
		stop : function(){
			deRegisterEvents();
		},
		start : function(){
			registerEvents();
		}
	};
}