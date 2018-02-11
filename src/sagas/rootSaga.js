// Saga effects
// import { fork } from 'redux-saga/effects'
import { call, all } from 'redux-saga/effects'
import { watchUpVideo } from './cameraSaga'

export default function * rootSaga () {
  yield call(watchUpVideo)
  // yield call(watchUpdatePin)
  // yield [
  //   fork(watchUpVideo),
  //   fork(watchUpdatePin)
  // ]
}
