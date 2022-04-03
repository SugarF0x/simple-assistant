import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const pinia = createPinia().use(piniaPluginPersistedstate)

const app = createApp(App).use(router).use(pinia)

const appElement = document.createElement("div")
appElement.id = "app"
document.querySelector("footer")?.after(appElement)

/**
 * I have no fucking clue as to why this happens
 * I've tried to many different ways of solving this
 * and then i've accidentally stumbled upon this solution out of sheer desperation
 * Seems like already present Vue 2 instance is somehow interfering with Vue 3 content script
 * There is no other way i could explain the fact that Vue 2 works just fine while Vue 3
 * has literally no reactivity
 * Although even at that i cant explain why exactly a 50ms timeout fixes this
 * Fuck this shit
 *
 * Edit: scratch that, it magically fixed itself and timeout is no longer needed
 */

app.mount("#app")
