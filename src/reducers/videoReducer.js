import { UP_SUCCEEDED, UP_FAILED, SET_LOGOUT, SET_NULL, UP_VIDEO } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const initialState = {
  data: [],
  isSuccess: null,
  dataFetched: false,
  fetching: false,
  error: null
}

const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case UP_VIDEO:
      return {
        ...state,
        data: [],
        fetching: true,
        isSuccess: null
      }
    case SET_LOGOUT:
      return []
    case UP_SUCCEEDED:
      // return [action.video, action.isSuccess]
      return {
        ...state,
        fetching: false,
        data: action.video,
        isSuccess: true
      }
    case UP_FAILED:
      // return action.video
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case SET_NULL:
      return []
    default:
      return state // state does not change
  }
}

export default videoReducers
