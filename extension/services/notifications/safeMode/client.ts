import { SafeModeNotification } from "./types"

export function sendSafeModeNotificationMessage(timestamp: string, toggle: boolean) {
  chrome.runtime.sendMessage<SafeModeNotification>({
    toggle,
    data: { timestamp },
    variant: "safeMode",
    type: "notification",
  })
}
