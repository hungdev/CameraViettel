import {
  CREATE_FOLDER, CREATE_FOLDER_SUCCEEDED, CREATE_FOLDER_FAILED, GET_FOLDER,
  GET_FOLDER_SUCCEEDED, GET_FOLDER_FAILED, GET_ICAMERA_FOLDER, GET_ICAMERA_FOLDER_SUCCEEDED,
  GET_ICAMERA_FOLDER_FAILED, SHARE_TO_EMAIL, SHARE_TO_EMAIL_SUCCEEDED,
  SHARE_TO_EMAIL_FAILED, GET_FILE_IN_FOLDER, GET_FILE_IN_FOLDER_SUCCEEDED, GET_FILE_IN_FOLDER_FAILED
} from '../actions/actionTypes'

import { put, takeLatest, call } from 'redux-saga/effects'
import { Api } from './Api'
import Reactotron from 'reactotron-react-native'

function * createFolder (action) {
  // Reactotron.log('Saga folder')
  // Reactotron.log(action)
  try {
    const result = yield Api.createFolderFromApi(action.token, action.folderName, action.parent)
    // Reactotron
    Reactotron.log('result')
    Reactotron.log(result)
    if (result && result.respInfo.status === 200) {
      const data = JSON.parse(result.data)
      Reactotron.log('data1111111')
      Reactotron.log(data)
      yield put({ type: CREATE_FOLDER_SUCCEEDED, folder: data })
    } else {
      yield put({ type: CREATE_FOLDER_FAILED, folder: 'Unknown Error' })
    }
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: CREATE_FOLDER_FAILED, error: error })
  }
}
export function * watchCreateFolder () {
  Reactotron.log('SwatchCreateFolder')
  yield takeLatest(CREATE_FOLDER, createFolder)
}

function * getFolder (action) {
  Reactotron.log('Saga getFolder')
  Reactotron.log(action)
  try {
    const result = yield Api.getFolderFromApi(action.token, action.parent, action.specialEmail)
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

// GET FILE IN FOLDER
function * getFileInFolder (action) {
  Reactotron.log('Saga getFolder')
  Reactotron.log(action)
  try {
    const result = yield Api.getFileInFolderFromApi(action.token, action.parent)
    if (result && result.respInfo.status === 200) {
      const data = JSON.parse(result.data)
      yield put({ type: GET_FILE_IN_FOLDER_SUCCEEDED, fileInFolder: data.files })
    } else {
      yield put({ type: GET_FILE_IN_FOLDER_FAILED, folder: 'Unknown Error' })
    }
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: GET_FOLDER_FAILED, video: error })
  }
}
export function * watchGetFileInFolder () {
  Reactotron.log('SwatchCreateFolder')
  yield takeLatest(GET_FILE_IN_FOLDER, getFileInFolder)
}

function * getICameraFolder (action) {
  Reactotron.log('Saga getICameraFolder')
  Reactotron.log(action)
  try {
    const result = yield Api.getICameraFolder(action.token)
    // Reactotron.log('sg Icam')
    // Reactotron.log(result)
    yield put({ type: GET_ICAMERA_FOLDER_SUCCEEDED, folder: result })
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: GET_ICAMERA_FOLDER_FAILED, error })
  }
}
export function * watchGetICameraFolder () {
  Reactotron.log('SwatchCreateFolder')
  yield takeLatest(GET_ICAMERA_FOLDER, getICameraFolder)
}

function * shareFolderToEmail (action) {
  Reactotron.log('Saga getICameraFolder')
  Reactotron.log(action)
  try {
    const result = yield Api.requestShareFolderToEmail(action.token, action.idFolder, action.emailShare)
    // Reactotron.log('sg Icam')
    // Reactotron.log(result)
    yield put({ type: SHARE_TO_EMAIL_SUCCEEDED, emailShared: result })
  } catch (error) {
    Reactotron.log('error')
    Reactotron.log(error)
    yield put({ type: SHARE_TO_EMAIL_FAILED, error })
  }
}
export function * watchShareFolderToEmail () {
  Reactotron.log('SwatchCreateFolder')
  yield takeLatest(SHARE_TO_EMAIL, shareFolderToEmail)
}
