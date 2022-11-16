import { getResetTimeString } from "./getResetTimeString"
import { padArrayStart } from "@/utils"
import { add } from "date-fns"

export async function getResetTimestamp(): Promise<string> {
  const time = await getResetTimeString()
  const [days, hours, minutes, seconds] = padArrayStart(
    time
      .split(" ")
      .map(Number)
      .filter((item) => !isNaN(item)),
    4,
    0
  )
  return add(new Date(), { days, hours, minutes, seconds }).toISOString()
}
