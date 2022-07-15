const ws = new WebSocket(`ws://localhost:9012`)

ws.addEventListener("message", (event) => {
  if (event.data === "HMR") {
    console.log("sumbitting HMR message")
    chrome.runtime.sendMessage({ type: "HMR" })
  }
})
