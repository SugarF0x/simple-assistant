import { isServiceNotification } from "../utils"
import { SafeModeNotificationData, isSafeModeNotification } from "./types"
import { ORIGIN } from "~/consts"

function serializeSafeModeData() {
  return JSON.stringify(["safeMode"])
}

function deserializeSafeModeData(data: string) {
  return JSON.parse(data) as [string]
}

function createSafeModeNotification(safeMode: SafeModeNotificationData) {
  /**
   * Same issue as with jobs finish times going into the negative ¯\_(ツ)_/¯
   */
  const when = new Date(safeMode.timestamp).valueOf() + 1000 * 60 * 2
  chrome.alarms.create(serializeSafeModeData(), { when })
}

function clearSafeModeNotification() {
  chrome.alarms.clear(serializeSafeModeData())
}

chrome.runtime.onMessage.addListener((payload) => {
  if (!isServiceNotification(payload)) return
  if (!isSafeModeNotification(payload)) return

  if (payload.toggle) createSafeModeNotification(payload.data)
  else clearSafeModeNotification()

  return true
})

chrome.alarms.onAlarm.addListener(({ name: id }) => {
  const [notification] = deserializeSafeModeData(id)
  if (notification !== "safeMode") return

  chrome.notifications.create(id, {
    type: "basic",
    message: "Reactivate your safe mode now!",
    title: "Safe mode expired",
    iconUrl: ORIGIN + "/img/icons/E_Gold01.png",
  })

  return true
})

chrome.notifications.onClicked.addListener((id) => {
  const [notification] = deserializeSafeModeData(id)
  if (notification !== "safeMode") return

  chrome.tabs.create({ url: ORIGIN + "/safemode" })
  chrome.notifications.clear(id)

  return true
})
