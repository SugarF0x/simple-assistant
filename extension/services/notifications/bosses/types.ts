import { NotificationServiceMessage } from "../utils"
import { Boss } from "@/views/Arena/store"

export interface BossNotification extends NotificationServiceMessage {
  variant: "boss"
  toggle: boolean
  data: Boss[]
}

export function isBossNotification(val: NotificationServiceMessage): val is BossNotification {
  return val.variant === "boss"
}
