import { CREATE_FOLDER, CREATE_FOLDER_SUCCEEDED, CREATE_FOLDER_FAILED, GET_FOLDER, GET_FOLDER_SUCCEEDED, GET_FOLDER_FAILED } from '../actions/actionTypes'

import { put, takeLatest, call } from 'redux-saga/effects'
import { Api } from './Api'
import Reactotron from 'reactotron-react-native'

function * createFolder (action) {
  // Reactotron.log('Saga folder')
  // Reactotron.log(action)
  try {
    const result = yield Api.createFolderFromApi(action.token, action.folderName)
    // Reactotron
    Reactotron.log('result')
    Reactotron.log(result)
    if (result && result.respInfo.status === 200) {
      const data = JSON.parse(result.data)
      yield put({ type: CREATE_FOLDER_SUCCEEDED, folder: data })
    } else {
      yield put({ type: CREATE_FOLDER_FAILED, folder: 'Unknown Error' })
    }
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: CREATE_FOLDER_FAILED, folder: error })
  }
}
export function * watchCreateFolder () {
  Reactotron.log('SwatchCreateFolder')
  yield takeLatest(CREATE_FOLDER, createFolder)
}

function * getFolder (action) {
  Reactotron.log('Saga get folder')
  Reactotron.log(action)
  try {
    const result = yield Api.getFolderFromApi(action.token)
    if (result && result.respInfo.status === 200) {
      const data = JSON.parse(result.data)
      yield put({ type: GET_FOLDER_SUCCEEDED, folder: data.files })
    } else {
      yield put({ type: GET_FOLDER_FAILED, folder: 'Unknown Error' })
    }
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: GET_FOLDER_FAILED, video: error })
  }
}
export function * watchGetFolder () {
  Reactotron.log('SwatchCreateFolder')
  yield takeLatest(GET_FOLDER, getFolder)
}
