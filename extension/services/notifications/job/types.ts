import { NotificationServiceMessage } from "../utils"

export interface JobNotificationData {
  timestamp: number
  iconUrl: string
}

export interface JobNotification extends NotificationServiceMessage {
  variant: "job"
  data: JobNotificationData
}

export function isJobNotification(val: NotificationServiceMessage): val is JobNotification {
  return val.variant === "job"
}
