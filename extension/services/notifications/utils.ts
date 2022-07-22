import { ServiceMessage } from "~/definitions"
import { Boss } from "@/views/Arena/store"

export interface NotificationServiceMessage extends ServiceMessage {
  type: "notification"
}

export function isServiceNotification(val: any): val is NotificationServiceMessage {
  return val?.type === "notification"
}

// boss

export interface BossNotification extends NotificationServiceMessage {
  variant: "boss"
  toggle: boolean
  data: Boss[]
}

export function isBossNotification(val: NotificationServiceMessage): val is BossNotification {
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

// job

export interface JobNotificationData {
  href: string
  timestamp: number
  iconUrl: string
}

interface JobNotification extends NotificationServiceMessage {
  variant: "job"
  toggle: boolean
  data: JobNotificationData
}

export function isJobNotification(val: NotificationServiceMessage): val is JobNotification {
  return val.variant === "job"
}

export function sendJobNotificationMessage(data: JobNotificationData, toggle: boolean) {
  chrome.runtime.sendMessage<JobNotification>({
    data,
    toggle,
    variant: "job",
    type: "notification",
  })
}
