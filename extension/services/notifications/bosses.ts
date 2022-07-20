import { createNotification, isServiceNotification, NotificationServiceMessage } from "./utils"
import { Boss } from "@/views/Arena/store"

interface BossNotification extends NotificationServiceMessage {
  variant: "boss"
  toggle: boolean
  data: Boss[]
}

function isBossNotification(val: NotificationServiceMessage): val is BossNotification {
  return val.variant === "boss"
}

export function sendBossNotificationMessage(data: Boss[], toggle: boolean) {
  chrome.runtime.sendMessage<BossNotification>({
    data,
    toggle,
    variant: "boss",
    type: "notification",
  })
}

function getBossNotificationId(boss: Boss) {
  return `boss-${boss.id}`
}

function createBossNotification(boss: Boss) {
  const { timestamp, href, name: title, img: iconUrl } = boss

  createNotification({
    id: getBossNotificationId(boss),
    timestamp: new Date(timestamp).valueOf(),
    message: "A boss is now attackable!",
    href,
    title,
    iconUrl,
  })
}

chrome.runtime.onMessage.addListener((payload) => {
  if (!isServiceNotification(payload)) return
  if (!isBossNotification(payload)) return

  if (payload.toggle) payload.data.forEach((boss) => createBossNotification(boss))
  else payload.data.forEach((boss) => chrome.alarms.clear(getBossNotificationId(boss)))

  return true
})
