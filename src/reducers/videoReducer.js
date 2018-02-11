import { UP_SUCCEEDED } from '../actions/actionTypes'
import Reactotron from 'reactotron-react-native'

const videoReducers = (videos = [], action) => {
  switch (action.type) {
    case UP_SUCCEEDED:
      Reactotron.log('action.video')
      Reactotron.log(action.video)
      console.log('reducer')
      console.log(action.video)
    
      return action.video
    default:
      return videos // state does not change
  }
}

export default videoReducers
