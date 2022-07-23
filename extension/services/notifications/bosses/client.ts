import { Boss } from "@/views/Arena/store"
import { BossNotification } from "./types"

export function sendBossNotificationMessage(data: Boss[], toggle: boolean) {
  chrome.runtime.sendMessage<BossNotification>({
    data,
    toggle,
    variant: "boss",
    type: "notification",
  })
}
