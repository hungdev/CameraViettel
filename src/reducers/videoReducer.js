import { UP_SUCCEEDED, UP_FAILED, SET_LOGOUT, UP_PROGRESS } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const videoReducers = (videos = [], action) => {
  switch (action.type) {
    case SET_LOGOUT:
      return []
    case UP_SUCCEEDED:
      Reactotron.log('qqqqqqqqqq')
      Reactotron.log(action)
      return [action.video, action.isSuccess]
    case UP_FAILED:
      return action.video
    default:
      return videos // state does not change
  }
}

export default videoReducers
