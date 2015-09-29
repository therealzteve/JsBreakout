/**
 * 
 */

var breakOutGame = {
	canvas : null,
	levelCreator : null,
	board : null,
	ball : null,
	init : function(){
		paper.install(window);
		this.canvas = document.getElementById("myCanvas");
		paper.setup(this.canvas);
		this.levelCreator = levelCreator();
		this.board = board();
		this.ball = ball();
	},
	start : function(){
		//this.levelCreator.loadLevel(0);
		this.board.load();
		this.ball.load();
	}
};