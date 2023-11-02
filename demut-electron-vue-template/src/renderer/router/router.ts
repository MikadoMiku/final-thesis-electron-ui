import MainView from '../components/MainView.vue'
import MainPage from '../components/MainPage.vue'
import AudioEndpoints from '../components/AudioEndpoints.vue'
import Testing from '../components/testing/Testing.vue'
import PingWheel from '../components/PingWheel.vue'
import AudioFiles from '../components/AudioFiles.vue'
import TextToSpeech from '../components/TextToSpeech.vue'
import OverlayMain from '../components/overlay/OverlayMain.vue'
import Configuration from '../components/Configuration.vue'

const routes = [
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '/',
        component: MainView
      },
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
      },
      {
        path: '/configuration',
        component: Configuration
      }
    ]
  },
  {
    path: '/overlay',
    component: OverlayMain
  }
]

export default routes
