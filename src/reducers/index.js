import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import videoReducer from './videoReducer'
import progressReducer from './progressReducer'
import folderReducer from './folderReducer'

const allReducers = combineReducers({
  accountReducer,
  videoReducer,
  progressReducer,
  folderReducer
  // you can add more reducers here, separated by , !
})
export default allReducers
