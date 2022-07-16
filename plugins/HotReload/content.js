const ws = new WebSocket(`ws://localhost:9012`)

ws.addEventListener("message", (event) => {
  if (event.data === "HMR") {
    chrome.runtime.sendMessage({ type: "HMR" })
  }
})
