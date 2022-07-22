chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "HMR") {
    chrome.tabs.query({ url: "*://*.simple-mmo.com/*" }, (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.reload(tab.id)
      }
      chrome.runtime.reload()
    })
  }
  return true
})
