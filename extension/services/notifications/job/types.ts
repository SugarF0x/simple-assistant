import { NotificationServiceMessage } from "../utils"

export interface JobNotificationData {
  href: string
  timestamp: number
  iconUrl: string
}

export interface JobNotification extends NotificationServiceMessage {
  variant: "job"
  toggle: boolean
  data: JobNotificationData
}

export function isJobNotification(val: NotificationServiceMessage): val is JobNotification {
  return val.variant === "job"
}
