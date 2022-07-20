import { ServiceMessage } from "~/definitions"

export interface NotificationServiceMessage extends ServiceMessage {
  type: "notification"
}

export function isServiceNotification(val: any): val is NotificationServiceMessage {
  return val?.type === "notification"
}

export interface NotificationOptions {
  id: string
  timestamp: number
  iconUrl: string
  title: string
  message: string
  href?: string
}

export function createNotification(data: NotificationOptions) {
  const { id, title, timestamp, iconUrl, href, message } = data
  chrome.alarms.create(id, { when: new Date(timestamp).valueOf() })

  function onAlarm(alarm: chrome.alarms.Alarm) {
    if (alarm.name !== id) return

    chrome.notifications.create(id, {
      type: "basic",
      message,
      iconUrl,
      title,
    })

    function onClick(clickId: string) {
      if (clickId !== id) return

      if (href) chrome.tabs.create({ url: href })
      chrome.notifications.clear(id)
      chrome.notifications.onClicked.removeListener(onClick)
    }

    chrome.notifications.onClicked.addListener(onClick)
    chrome.alarms.onAlarm.removeListener(onAlarm)
  }

  chrome.alarms.onAlarm.addListener(onAlarm)
}
