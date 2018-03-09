import { UP_SUCCEEDED, UP_FAILED, SET_LOGOUT, UP_PROGRESS, SET_NULL } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const progressReducer = (state = '', action) => {
  if (action.type === UP_PROGRESS) {
    Reactotron.log('UP_PROGRESS')
    Reactotron.log(action.progress)
    return action.progress
  }
  // if (action.type === SET_NULL) {
  //   return []
  // }
  return state
}

export default progressReducer
