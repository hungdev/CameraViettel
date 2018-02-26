import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import videoReducer from './videoReducer'
import progressReducer from './progressReducer'

const allReducers = combineReducers({
  accountReducer,
  videoReducer,
  progressReducer
  // you can add more reducers here, separated by , !
})
export default allReducers
