import { isServiceNotification } from "../utils"
import { JobNotificationData, isJobNotification } from "./types"

type SanitizedJobData = Omit<JobNotificationData, "timestamp">

function serializeJobData(job: JobNotificationData) {
  const { href, iconUrl } = job
  return JSON.stringify(["job", { href, iconUrl } as SanitizedJobData])
}

function deserializeJobData(data: string) {
  return JSON.parse(data) as [string, SanitizedJobData]
}

function createJobNotification(job: JobNotificationData) {
  chrome.alarms.create(serializeJobData(job), { when: new Date(job.timestamp).valueOf() })
}

function clearJobNotification(job: JobNotificationData) {
  chrome.alarms.clear(serializeJobData(job))
}

chrome.runtime.onMessage.addListener((payload) => {
  if (!isServiceNotification(payload)) return
  if (!isJobNotification(payload)) return

  if (payload.toggle) createJobNotification(payload.data)
  else clearJobNotification(payload.data)

  return true
})

chrome.alarms.onAlarm.addListener(({ name: id }) => {
  const [notification, { iconUrl }] = deserializeJobData(id)
  if (notification !== "job") return

  chrome.notifications.create(id, {
    type: "basic",
    message: "You have finished working",
    title: "Job finished",
    iconUrl,
  })

  return true
})

chrome.notifications.onClicked.addListener((id) => {
  const [notification, { href }] = deserializeJobData(id)
  if (notification !== "job") return

  chrome.tabs.create({ url: href })
  chrome.notifications.clear(id)

  return true
})
