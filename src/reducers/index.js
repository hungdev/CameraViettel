import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import videoReducer from './videoReducer'

const allReducers = combineReducers({
  accountReducer,
  videoReducer
  // you can add more reducers here, separated by , !
})
export default allReducers
