// Saga effects
import { fork } from 'redux-saga/effects'
import { call, all } from 'redux-saga/effects'
import { watchUpVideo } from './cameraSaga'
import { watchCreateFolder, watchGetFolder, watchGetICameraFolder, watchShareFolderToEmail } from './folderSaga'

export default function * rootSaga () {
	// yield call(watchUpVideo)
	// yield call(watchCreasteFolder)
  yield [
    fork(watchUpVideo),
    fork(watchCreateFolder),
    fork(watchGetFolder),
    fork(watchGetICameraFolder),
    fork(watchShareFolderToEmail)
  ]
}
