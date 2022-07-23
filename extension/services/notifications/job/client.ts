import { JobNotification, JobNotificationData } from "./types"

export function sendJobNotificationMessage(data: JobNotificationData, toggle: boolean) {
  chrome.runtime.sendMessage<JobNotification>({
    data,
    toggle,
    variant: "job",
    type: "notification",
  })
}
