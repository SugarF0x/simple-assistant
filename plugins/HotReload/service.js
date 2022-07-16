chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "HMR") {
    chrome.tabs.query({ url: "*://*.simple-mmo.com/*" }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id)
      }
      chrome.runtime.reload()
    })
  }
  return true
})
