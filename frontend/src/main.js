import { createApp } from "vue"
import { FrappeUI, setConfig, frappeRequest } from "frappe-ui"

import App from "./App.vue"
import router from "./router"
import { session } from "./data/session"
import "./index.css"

setConfig("resourceFetcher", frappeRequest)
window.__PAYROLLOS_COMMUNITY_VERSION__ = "0.1"

const app = createApp(App)
app.use(FrappeUI)
app.use(router)

app.provide("session", session)
app.config.globalProperties.$session = session

app.mount("#app")
