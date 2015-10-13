function level(levelData){
	return {
		objects : levelData,
		create : function(){
			for(var i = 0 ; i < this.objects.length ; i++){
				this.objects[i].create();
			}
		},
		destroy : function(){
			for( var i = 0 ; i < this.objects.length ; i++){
				this.objects[i].destroy();
			}
		}
	};
};
