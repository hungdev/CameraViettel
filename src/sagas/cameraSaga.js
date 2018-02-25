import { SET_TOKEN, UP_VIDEO, UP_SUCCEEDED, UP_FAILED } from '../actions/actionTypes'

import { put, takeLatest, call } from 'redux-saga/effects'
import { Api } from './Api'
import Reactotron from 'reactotron-react-native'

function * upVideo (action) {
  try {
    const id = yield call(Api.upVideoFromApi, action.token, action.video)
    Reactotron.log('FileID:')
    Reactotron.log(id)
    yield put({ type: UP_SUCCEEDED, video: id })
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: UP_FAILED, video: error })
  }
}
export function * watchUpVideo () {
  yield takeLatest(UP_VIDEO, upVideo)
}
