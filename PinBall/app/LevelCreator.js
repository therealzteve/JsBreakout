/**
 * 
 */

function levelCreator(){
	var levels = [];
	
	return {
		loadLevel : function(index){
			levels[i].create();
		}
	};
};

function level(){
	return {
		objects : [],
		create : function(){
			for(var i = 0 ; i < this.objects.length ; i++){
				objects[i].create();
			}
		}
	};
};

function brick(){
	return {
		create : function(){
			console.log("a brick was created");
		}
	};
};