import { MS_IN_DAY } from "@/consts"

export function getLondonTime(date?: Date) {
  return new Date((date?.valueOf() || Date.now()) + new Date().getTimezoneOffset() * 60 * 1000)
}

export function getTimeWithLondonOffset(date?: Date) {
  const day = new Date(getLondonTime(date).valueOf() - MS_IN_DAY / 2)
  day.setHours(0, 0, 0, 0)
  return day
}
