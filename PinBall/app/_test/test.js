
describe("A suite", function() {
	
  it("check empty input handler", function() {
	  var newMapping = InputMapping([]);
	  
	  var newContext = InputContext(newMapping);
	  
	  inputHandler.registerContext(newContext);
	  inputHandler.init();
	  keyPress(37);	  
  });
});

