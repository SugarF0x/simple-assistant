import { useDaily } from "./daily"

export function useMahol() {
  return {
    ...useDaily(),
  }
}
