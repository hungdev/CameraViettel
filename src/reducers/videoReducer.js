import { UP_SUCCEEDED, UP_FAILED } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const videoReducers = (videos = [], action) => {
  switch (action.type) {
    case UP_SUCCEEDED:
      return action.video
    case UP_FAILED:
      Reactotron.log('response')
      Reactotron.log(action)
      return action.video
    default:
      return videos // state does not change
  }
}

export default videoReducers
