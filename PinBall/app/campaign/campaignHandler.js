var CampaignHandler = function() {
	var current = 0;

	var story = [ {
		"name" : "Prolog",
		"type" : "story"
	}, {
		"name" : "Level1",
		"type" : "level"
	} ];
	
	function load(){
		// Load next step in story
	};
	
	return {
		start : function(){
			current = 0;
			load();
		},
		next : function(){
			current++;
			load();
		}
	}
}