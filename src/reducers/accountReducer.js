import { SET_TOKEN } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'
const isSetToken = (state = [], action) => {
  if (action.type === 'SET_TOKEN') {
    console.log(action)

    return action.accessToken
  }
  return state
}

export default isSetToken
