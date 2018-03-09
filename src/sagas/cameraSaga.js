import { SET_TOKEN, UP_VIDEO, UP_SUCCEEDED, UP_FAILED, UP_PROGRESS } from '../actions/actionTypes'

import { put, takeLatest, call } from 'redux-saga/effects'
import { Api } from './Api'
import Reactotron from 'reactotron-react-native'

function * upVideo (action) {
  try {
    let id
    const pq = Api.upVideoFromApi(action.token, action.video, action.videoName, action.fileType, action.parent)
    while (true) {
      id = (yield pq.next())[0]
      if (typeof id === 'number') {
        yield put({ type: UP_PROGRESS, progress: id })
      } else {
        break
      }
    }
    Reactotron.log('FileID:xx')
    Reactotron.log(id)
    yield put({ type: UP_SUCCEEDED, video: id })
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: UP_FAILED, error: error })
  }
}
export function * watchUpVideo () {
  yield takeLatest(UP_VIDEO, upVideo)
}
