import { SET_TOKEN, UP_SUCCEEDED, UP_VIDEO } from './actionTypes'
import Reactotron from 'reactotron-react-native'

export const setToken = () => {
  return {
    type: SET_TOKEN
  }
}

export const upLoadVideo = (token, video) => {
  return {
    type: UP_VIDEO,
    token,
    video
  }
}

export const upVideoSuccessAction = (video) => {
  return {
    type: UP_SUCCEEDED,
    video
  }
}
