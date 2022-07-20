import { createNotification, isServiceNotification, NotificationServiceMessage } from "./utils"

interface JobNotificationData {
  href: string
  timestamp: number
  iconUrl: string
}

interface JobNotification extends NotificationServiceMessage {
  variant: "job"
  toggle: boolean
  data: JobNotificationData
}

function isJobNotification(val: NotificationServiceMessage): val is JobNotification {
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

function createJobNotification(data: JobNotificationData) {
  const { timestamp, iconUrl, href } = data

  createNotification({
    id: "job",
    message: "You have finished working!",
    title: "Job completed",
    timestamp,
    iconUrl,
    href,
  })
}

chrome.runtime.onMessage.addListener((payload) => {
  if (!isServiceNotification(payload)) return
  if (!isJobNotification(payload)) return

  if (payload.toggle) createJobNotification(payload.data)
  else chrome.alarms.clear("job")

  return true
})
