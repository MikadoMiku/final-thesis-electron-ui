import InitialModule from "../components/InitialModule.vue"
import MainView from "../components/MainView.vue"
import AudioEndpoints from "../components/AudioEndpoints.vue"
import Testing from "../components/testing/Testing.vue"
import PingWheel from "../components/testing/PingWheel.vue"

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
    {
        path: "/pingWheel",
        component: PingWheel,
    },
]

export default routes
