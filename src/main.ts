import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const app = document.createElement("div")
app.id = "app"
document.querySelector("footer")?.after(app)

createApp(App).use(router).mount("#app")
