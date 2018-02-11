import { AppRegistry } from 'react-native'
import App from './src/containers/App'
import './ReactotronConfig'
console.ignoredYellowBox = [
  'Setting a timer'
]

AppRegistry.registerComponent('CameraViettel', () => App)
