import { SET_TOKEN } from '../actions/actionTypes'
const isSetToken = (state = [], action) => {
  if (action.type === 'SET_TOKEN') return action.token
  return state
}

export default isSetToken
