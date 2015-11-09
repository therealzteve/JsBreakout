define([ "app/event/eventManager" , "_test/testUtils/testEventListener"], function(EventManager, TestEventListener) {
	
	describe("eventHandler tests: ", function() {

		var eventManager, testEventListener;
		var parentEventManager, parentEventListener;
		var callback, parentCallback; 
		
		

		beforeEach(function() {
			prepareParentEventStuff();
			prepareChildEventStuff();
		});
		
		it("should create an eventManager", function() {
			expect(eventManager).toBeDefined();
		});

		
		it("should and add an listener", function() {
			eventManager.registerListener(testEventListener);
			expect(testEventListener).toBeDefined();
		});
		
		it("should call an event", function() {
			eventManager.registerListener(testEventListener);
			eventManager.event("TEST");		 
			expect(callback.b).toHaveBeenCalled();
		});
		
		it("should call an event in parent", function() {
			eventManager.event("TEST");		 
			expect(parentCallback.b).toHaveBeenCalled();
		});
		
		
		function prepareParentEventStuff(){
			parentEventManager = EventManager();
			parentCallback = { b : function(){}}; 
			spyOn(parentCallback, "b");
			parentEventListener = TestEventListener(parentCallback.b);
			parentEventManager.registerListener(parentEventListener);
		};
		
		function prepareChildEventStuff(){
			eventManager = EventManager(parentEventManager);
			callback = { b :  function(){}};
			spyOn(callback, "b"); 
			testEventListener = TestEventListener(callback.b); 	
			eventManager.registerListener(testEventListener);
		};
	});

});