import InitialModule from "../components/InitialModule.vue"
import MainView from "../components/MainView.vue"
import AudioEndpoints from "../components/AudioEndpoints.vue"
import Testing from "../components/testing/Testing.vue"

const routes = [
    {
        path: "/",
        component: MainView,
    },
    {
        path: "/audioEndpoints",
        component: AudioEndpoints,
    },
    {
        path: "/testing",
        component: Testing,
    },
]

export default routes
