import { SET_TOKEN, UP_VIDEO, UP_SUCCEEDED, UP_FAILED } from '../actions/actionTypes'

import { put, takeLatest, call } from 'redux-saga/effects'
import { Api } from './Api'
import Reactotron from 'reactotron-react-native'

function * upVideo (action) {
  try {
    const response = yield call(Api.upVideoFromApi, action.token, action.video)
    if (response.ok) {
      // Reactotron.log('call res')
      // console.log('response')
      // console.log(response)
      yield put({ type: UP_SUCCEEDED, video: response.data })
    } else {
      yield put({ type: UP_FAILED, video: response.data })
    }
  } catch (error) {
    Reactotron.log(`Error = ${error}`)
  }
}
export function * watchUpVideo () {
  yield takeLatest(UP_VIDEO, upVideo)
}
