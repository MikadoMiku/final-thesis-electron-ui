import MainView from '../components/MainView.vue'
import MainPage from '../components/MainPage.vue'
import AudioEndpoints from '../components/AudioEndpoints.vue'
import Testing from '../components/testing/Testing.vue'
import PingWheel from '../components/testing/PingWheel.vue'
import AudioFiles from '../components/AudioFiles.vue'
import TextToSpeech from '../components/TextToSpeech.vue'
import OverlayMain from '../components/overlay/OverlayMain.vue'

const routes = [
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '/audioEndpoints',
        component: AudioEndpoints
      },
      {
        path: '/testing',
        component: Testing
      },
      {
        path: '/pingWheel',
        component: PingWheel
      },
      {
        path: '/audioFiles',
        component: AudioFiles
      },
      {
        path: '/textToSpeech',
        component: TextToSpeech
      }
    ]
  },
  {
    path: '/overlay',
    component: OverlayMain,
  }
]

export default routes
