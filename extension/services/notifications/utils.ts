import { Boss } from "@/views/Arena/store"

export interface BossNotification {
  type: "notification"
  variant: "boss"
  toggle: boolean
  data: Boss[]
}

export function sendBossNotificationMessage(data: Boss[], toggle: boolean) {
  chrome.runtime.sendMessage({
    data,
    toggle,
    variant: "boss",
    type: "notification",
  })
}

export function getBossNotificationId(boss: Boss) {
  return `boss-${boss.id}`
}

export function createBossNotification(boss: Boss) {
  const id = getBossNotificationId(boss)
  chrome.alarms.create(id, { when: new Date(boss.timestamp).valueOf() })

  function onAlarm(alarm: chrome.alarms.Alarm) {
    if (alarm.name !== id) return

    chrome.notifications.create(id, {
      iconUrl: `https://web.simple-mmo.com${boss.img}`,
      message: "A boss is now attackable!",
      type: "basic",
      title: boss.name,
    })

    function onClick(clickId: string) {
      if (clickId !== id) return

      chrome.tabs.create({ url: `https://web.simple-mmo.com${boss.href}?sa-notified=true` })
      chrome.notifications.clear(id)
      chrome.notifications.onClicked.removeListener(onClick)
    }

    chrome.notifications.onClicked.addListener(onClick)
    chrome.alarms.onAlarm.removeListener(onAlarm)
  }

  chrome.alarms.onAlarm.addListener(onAlarm)
}
