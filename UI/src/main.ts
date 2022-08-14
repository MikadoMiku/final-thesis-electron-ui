import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { setupComminucator } from "./communication/communicator"

setupComminucator()

const app = createApp(App)

app.use(createPinia())

app.mount("#app")
