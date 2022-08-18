import InitialModule from "../components/InitialModule.vue"
import MainView from "../components/MainView.vue"
import AudioEndpoints from "../components/AudioEndpoints.vue"

const routes = [
    {
        path: "/",
        component: MainView,
    },
    {
        path: "/audioEndpoints",
        component: AudioEndpoints,
    },
]

export default routes
