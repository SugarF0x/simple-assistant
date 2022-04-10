import { useDaily } from "./useDaily"

export function useMahol() {
  return {
    ...useDaily(),
  }
}
