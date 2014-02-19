this.setZeroTimeout || (this.setZeroTimeout = new (function(window) {
  var handleMessage, messageName, timeouts;
  timeouts = [];
  messageName = "zero-timeout-message-" + new Date().getTime();
  handleMessage = function(event) {
    if (event.data === messageName) {
      event.stopPropagation();
      if (timeouts.length) {
        return timeouts.shift()();
      }
    }
  };
  window.addEventListener("message", handleMessage, true);
  return function(fn) {
    timeouts.push(fn);
    return window.postMessage(messageName, "*");
  };
})(window));
