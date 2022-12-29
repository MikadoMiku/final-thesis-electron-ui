import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import routes from "./router/router"
import { createRouter, createWebHashHistory } from "vue-router"
import { setupCommunicator } from "./communication/communicator"

// ---------------------------------- FONT AWESOME ----------------------------------
import { library } from '@fortawesome/fontawesome-svg-core'

import { faFile } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFile)
// ----------------------------------------------- ----------------------------------

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

setupCommunicator()


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app")

