import { SET_TOKEN, UP_SUCCEEDED, UP_VIDEO, SET_ACCOUNT, SET_LOGOUT } from './actionTypes'
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
export const setLogout = () => {
  return {
    type: SET_LOGOUT
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

export const uploadProgress = (progress) => {
  return {
    type: UPLOAD_PROGRESS,
    progress
  }
}
