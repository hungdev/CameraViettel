import { CREATE_FOLDER_SUCCEEDED, CREATE_FOLDER_FAILED, SET_NULL, SET_LOGOUT, GET_FOLDER_SUCCEEDED, GET_FOLDER_FAILED } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const folderReducers = (folders = [], action) => {
  switch (action.type) {
    case SET_LOGOUT:
      return []
    case CREATE_FOLDER_SUCCEEDED:
      return [...folders, action.folder]
    case CREATE_FOLDER_FAILED:
      return action.folder
    case GET_FOLDER_SUCCEEDED:
      return action.folder
    case GET_FOLDER_FAILED:
      return action.folder
    case SET_NULL:
      return []
    default:
      return folders // state does not change
  }
}

export default folderReducers
