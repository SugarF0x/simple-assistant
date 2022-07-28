import { isServiceNotification } from "../utils"
import { JobNotificationData, isJobNotification } from "./types"
import { ORIGIN } from "~/consts"

type SanitizedJobData = Omit<JobNotificationData, "timestamp">

function serializeJobData(job: JobNotificationData) {
  const { iconUrl } = job
  return JSON.stringify(["job", { iconUrl } as SanitizedJobData])
}

function deserializeJobData(data: string) {
  return JSON.parse(data) as [string, SanitizedJobData]
}

function createJobNotification(job: JobNotificationData) {
  /**
   * Come on, Mike, it aint that difficult to have the job end when it says it should
   * instead of displaying shit like "will finish working in -2 minutes"
   *
   * Anyway, this was getting annoying, so lets leave it at that for now
   */
  const when = new Date(job.timestamp).valueOf() + 1000 * 60 * 2
  chrome.alarms.create(serializeJobData(job), { when })
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
  const [notification] = deserializeJobData(id)
  if (notification !== "job") return

  chrome.tabs.create({ url: ORIGIN })
  chrome.notifications.clear(id)

  return true
})
