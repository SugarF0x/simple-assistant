import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

export const pinia = createPinia().use(piniaPluginPersistedstate)

export default pinia

export * from "./travel"
export * from "./battle"
