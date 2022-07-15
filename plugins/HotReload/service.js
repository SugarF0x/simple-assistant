chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "HMR") {
    console.log("got HMR message")
    chrome.tabs.query({ url: "*://*.simple-mmo.com/*" }, (tabs) => {
      console.log(tabs)
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id)
      }
      chrome.runtime.reload()
    })
  }
  return true
})
