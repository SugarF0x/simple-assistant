import { ServiceMessage } from "~/definitions"

export interface NotificationServiceMessage extends ServiceMessage {
  type: "notification"
}

export function isServiceNotification(val: any): val is NotificationServiceMessage {
  return val?.type === "notification"
}
