import { UP_SUCCEEDED, UP_FAILED, SET_LOGOUT, UP_PROGRESS } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const videoReducers = (videos = [], action) => {
  switch (action.type) {
    case SET_LOGOUT:
      return []
    case UP_SUCCEEDED:
      // Reactotron.log('zzzzz')
      // Reactotron.log(action)
      return action.video
    case UP_FAILED:
      // Reactotron.log('response')
      // Reactotron.log(action)
      return action.video
    // case UP_PROGRESS:
    //   Reactotron.log('response')
    //   Reactotron.log(action.progress)
    //   return action.progress
    default:
      return videos // state does not change
  }
}

export default videoReducers
