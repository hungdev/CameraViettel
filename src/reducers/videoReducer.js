import { UP_SUCCEEDED, UP_FAILED, SET_LOGOUT, UP_PROGRESS, SET_NULL } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const videoReducers = (videos = [], action) => {
  switch (action.type) {
    case SET_LOGOUT:
      return []
    case UP_SUCCEEDED:
      return [action.video, action.isSuccess]
    case UP_FAILED:
      return action.video
    case SET_NULL:
      return []
    default:
      return videos // state does not change
  }
}

export default videoReducers
