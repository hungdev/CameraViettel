import { SET_TOKEN, UP_SUCCEEDED, UP_VIDEO, SET_ACCOUNT, SET_LOGOUT, UP_PROGRESS, SET_NULL, CREATE_FOLDER,
  GET_FOLDER, GET_ICAMERA_FOLDER, SET_SELECTED_FOLDER, SHARE_TO_EMAIL, GET_FILE_IN_FOLDER } from './actionTypes'
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
export const setNull = () => {
  return {
    type: SET_NULL
  }
}

export const upLoadVideo = (token, video, videoName, fileType, parent) => {
  return {
    type: UP_VIDEO,
    token,
    video,
    videoName,
    fileType,
    parent
  }
}

export const upVideoSuccessAction = (video) => {
  return {
    type: UP_SUCCEEDED,
    video
  }
}

export const createFolder = (token, folderName, parent) => {
  return {
    type: CREATE_FOLDER,
    token,
    folderName,
    parent
  }
}

export const getFolder = (token, parent, specialEmail) => {
  return {
    type: GET_FOLDER,
    token,
    parent,
    specialEmail
  }
}
export const getFileInfolder = (token, parent) => {
  return {
    type: GET_FILE_IN_FOLDER,
    token,
    parent
  }
}

export const getICameraFolder = (token) => {
  return {
    type: GET_ICAMERA_FOLDER,
    token
  }
}
export const setSelectedFolder = (selectedFolder) => {
  return {
    type: SET_SELECTED_FOLDER,
    selectedFolder
  }
}
export const shareToEmail = (token, idFolder, emailShare) => {
  return {
    type: SHARE_TO_EMAIL,
    token,
    idFolder,
    emailShare
  }
}
