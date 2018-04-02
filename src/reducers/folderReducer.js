import {
  CREATE_FOLDER_SUCCEEDED, CREATE_FOLDER_FAILED, SET_LOGOUT, GET_FOLDER_SUCCEEDED,
  GET_FOLDER_FAILED, GET_ICAMERA_FOLDER_SUCCEEDED, GET_ICAMERA_FOLDER_FAILED, CREATE_FOLDER,
  GET_ICAMERA_FOLDER, GET_FOLDER, SET_SELECTED_FOLDER, SHARE_TO_EMAIL, SHARE_TO_EMAIL_SUCCEEDED,
  SHARE_TO_EMAIL_FAILED
} from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const initialState = {
  data: [],
  folders: [],
  iCamFolder: null,
  isSuccess: null,
  dataFetched: false,
  fetching: false,
  selectedFolder: null,
  emailShared: null,
  // iCamFetching: false,
  error: null
}

const folderReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGOUT:
      return []
    case CREATE_FOLDER:
      return { ...state, data: [], fetching: true, isSuccess: null }
    case CREATE_FOLDER_SUCCEEDED:
      return { ...state, fetching: false, data: action.folder, isSuccess: true }
    case CREATE_FOLDER_FAILED:
      return { ...state, fetching: false, error: action.error }

    case GET_FOLDER:
      return { ...state, folders: [], fetching: true, isSuccess: null }
    case GET_FOLDER_SUCCEEDED:
      return { ...state, fetching: false, folders: action.folder, isSuccess: true }
    case GET_FOLDER_FAILED:
      return { ...state, fetching: false, error: action.error }

    case GET_ICAMERA_FOLDER:
      return { ...state, iCamFolder: null, fetching: true, isSuccess: null }
    case GET_ICAMERA_FOLDER_SUCCEEDED:
      return { ...state, fetching: false, iCamFolder: action.folder, isSuccess: true }
    case GET_ICAMERA_FOLDER_FAILED:
      return { ...state, fetching: false, error: action.error }

    case SET_SELECTED_FOLDER:
      return {...state, selectedFolder: action.selectedFolder}

    case SHARE_TO_EMAIL:
      return { ...state, fetching: true, isSuccess: null }
    case SHARE_TO_EMAIL_SUCCEEDED:
      return { ...state, fetching: false, emailShared: action.emailShared, isSuccess: true }
    case SHARE_TO_EMAIL_FAILED:
      return { ...state, fetching: false, error: action.error }

    default:
      return state // state does not change
  }
}

export default folderReducers
