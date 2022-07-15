import { BossNotification, createBossNotification, getBossNotificationId } from "./utils"

chrome.runtime.onMessage.addListener((request) => {
  const payload: BossNotification = request
  if (payload.type !== "notification" || payload.variant !== "boss") return

  if (payload.toggle) payload.data.forEach((boss) => createBossNotification(boss))
  else payload.data.forEach((boss) => chrome.alarms.clear(getBossNotificationId(boss)))

  return true
})
