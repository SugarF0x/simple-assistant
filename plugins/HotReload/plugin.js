const WebSocket = require("ws")

class HotReloadPlugin {
  constructor() {
    const wss = new WebSocket.Server({ port: 9012 })
    wss.on("connection", (ws) => {
      this.ws = ws
    })
  }

  apply(compiler) {
    compiler.hooks.done.tap("HotReloadPlugin", () => {
      this.ws?.send("HMR")
    })
  }
}

module.exports = HotReloadPlugin
