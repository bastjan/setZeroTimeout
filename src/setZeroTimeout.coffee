@setZeroTimeout ||= new () ->
  timeouts = []
  messageName = "zero-timeout-message-" + new Date().getTime()

  handleMessage = (event) ->
    if event.data is messageName
      event.stopPropagation()

      if timeouts.length
        timeouts.shift()()

  window.addEventListener "message", handleMessage, true
 
  (fn) ->
    timeouts.push fn
    return window.postMessage messageName, "*"
