import { SET_TOKEN, UP_SUCCEEDED, UP_VIDEO, SET_ACCOUNT } from './actionTypes'
import Reactotron from 'reactotron-react-native'

export const setToken = () => {
  return {
    type: SET_TOKEN
  }
}
export const setAccount = (account) => {
  return {
    type: SET_ACCOUNT,
    account
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
