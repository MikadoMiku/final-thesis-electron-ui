import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import routes from "./router/router"
import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")

