document.body.classList.add("sa-dev-mode")

function connect() {
  const ws = new WebSocket("ws://localhost:9012")

  ws.onopen = () => {
    document.body.classList.add("sa-ws-connected")
  }

  ws.onmessage = (e) => {
    if (e.data === "HMR") {
      chrome.runtime.sendMessage({ type: "HMR" })
    }
  }

  ws.onclose = () => {
    document.body.classList.remove("sa-ws-connected")
    setTimeout(() => {
      connect()
    }, 2000)
  }

  ws.onerror = (e) => {
    e.preventDefault()
    ws.close()
  }
}

connect()
