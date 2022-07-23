import { isServiceNotification } from "../utils"
import { isBossNotification } from "./types"
import { Boss } from "@/views/Arena/store"

type SanitizedBossData = Pick<Boss, "href" | "name" | "img">

function serializeBossData(boss: Boss) {
  const { href, name, img } = boss
  return JSON.stringify(["boss", { href, name, img } as SanitizedBossData])
}

function deserializeBossData(data: string) {
  return JSON.parse(data) as [string, SanitizedBossData]
}

function createBossNotification(boss: Boss) {
  chrome.alarms.create(serializeBossData(boss), { when: new Date(boss.timestamp).valueOf() })
}

function clearBossNotification(boss: Boss) {
  chrome.alarms.clear(serializeBossData(boss))
}

chrome.runtime.onMessage.addListener((payload) => {
  if (!isServiceNotification(payload)) return
  if (!isBossNotification(payload)) return

  if (payload.toggle) payload.data.forEach(createBossNotification)
  else payload.data.forEach(clearBossNotification)

  return true
})

chrome.alarms.onAlarm.addListener(({ name: id }) => {
  const [notification, { img, name }] = deserializeBossData(id)
  if (notification !== "boss") return

  chrome.notifications.create(id, {
    type: "basic",
    message: "A boss is now attackable!",
    iconUrl: img,
    title: name,
  })

  return true
})

chrome.notifications.onClicked.addListener((id) => {
  const [notification, { href }] = deserializeBossData(id)
  if (notification !== "boss") return

  chrome.tabs.create({ url: href })
  chrome.notifications.clear(id)

  return true
})
