import { NotificationServiceMessage } from "../utils"

export interface SafeModeNotificationData {
  timestamp: string
}

export interface SafeModeNotification extends NotificationServiceMessage {
  variant: "safeMode"
  toggle: boolean
  data: SafeModeNotificationData
}

export function isSafeModeNotification(val: NotificationServiceMessage): val is SafeModeNotification {
  return val.variant === "safeMode"
}
