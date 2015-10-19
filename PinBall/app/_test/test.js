
describe("InputHandler testing", function() {
	
  it("check empty input handler", function() {
	  var newMapping = InputMapping([]);
	  
	  var newContext = InputContext(newMapping);
	  
	  inputHandler.registerContext(newContext);
	  inputHandler.init();
	  keyPress(37);	  
  });
  
  
  it("check multiple contexts call through", function() {
	  var aCalled = false;
	  var mappingA = InputMapping([{"key" : "a", "callback" : function() { aCalled = true;}}]);
	  var mappingB = InputMapping([{"key" : "b", "callback" : function() { }}]);

	  var contextA = InputContext(mappingA);
	  var contextB = InputContext(mappingB);
	  
	  inputHandler.registerContext(contextA);
	  inputHandler.registerContext(contextB);
	  inputHandler.init(); 
	  keyPress(65);	 
	  
	  expect(aCalled).toBe(true);
  });
  
  it("check multiple contexts override first callback", function() {
	  var aCalled = false;
	  var secondACalled = false;
	  var mappingA = InputMapping([{"key" : "a", "callback" : function() { aCalled = true;}}]);
	  var mappingB = InputMapping([
			   {"key" : "b", "callback" : function() { }},
			   {"key" : "a", "callback" : function() { secondACalled = true}}
		]);

	  var contextA = InputContext(mappingA);
	  var contextB = InputContext(mappingB);
	  
	  inputHandler.registerContext(contextA);
	  inputHandler.registerContext(contextB);
	  inputHandler.init(); 
	  keyPress(65);	  
	  
	  expect(aCalled).toBe(false);
	  expect(secondACalled).toBe(true);
  });
});

