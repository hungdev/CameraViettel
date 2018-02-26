import { SET_TOKEN, SET_ACCOUNT, SET_LOGOUT } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const isSetAccount = (state = [], action) => {
  if (action.type === SET_TOKEN) {
    // console.log(action)
    return action.accessToken
  }
  if (action.type === SET_ACCOUNT) {
    return action.account
  }
  if (action.type === SET_LOGOUT) {
    return []
  }
  return state
}

export default isSetAccount
