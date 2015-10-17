function keyPress(key) {
  var event = document.createEvent('Event');
  event.keyCode = key;
  event.initEvent('keydown');
  document.dispatchEvent(event);
}