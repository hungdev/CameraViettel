import { SET_TOKEN, UP_VIDEO, UP_SUCCEEDED, UP_FAILED, UP_PROGRESS } from '../actions/actionTypes'
import { put, takeLatest, call } from 'redux-saga/effects'
import RNFetchBlob from 'react-native-fetch-blob'
import Reactotron from 'reactotron-react-native'
import PromiseQueue from '../components/Queue'
import _ from 'lodash'
// https://stackoverflow.com/questions/43465769/google-drive-api-v3-simple-create-a-folder-in-a-folder-issue
// docs: https://developers.google.com/drive/v3/reference/files/update
function upVideoFromApi (token, video, videoName, fileType, parent) {
  // file:///storage/emulated/0/DCIM/VID_20180227_153258.mp4
  const pq = new PromiseQueue()
  RNFetchBlob.fetch(
    'POST',
    'https://www.googleapis.com/upload/drive/v3/files', {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream'
    },
    RNFetchBlob.wrap(video)
  )
    .uploadProgress((written, total) => {
      const progress = written / total
      pq.publish(progress)
    })
    .then((res) => {
      const id = res.json().id
      // return RNFetchBlob.fetch('PATCH', 'https://www.googleapis.com/drive/v3/files/' + id + '?addParents=1rv5rmnhoeghcW41c1KNjO7nLR98XzmNh&removeParents=root', {
      return RNFetchBlob.fetch('PATCH', 'https://www.googleapis.com/drive/v3/files/' + id + '?addParents=' + parent + '&removeParents=root', {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, JSON.stringify({
        name: `${videoName}.${fileType}`
      }))
    })
    .then((resp) => {
      pq.publish(resp.json())
    })
    .catch(pq.throw)
  return pq
}

function createFolderFromApi (token, folderName, parent) {
  Reactotron.log('parent')
  Reactotron.log(parent)
  return RNFetchBlob.fetch('POST', 'https://www.googleapis.com/drive/v3/files/', {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }, JSON.stringify({
    name: `${folderName}`,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [`${parent}`]
  })).then((res) => {
    Reactotron.log('res')
    Reactotron.log(res)
    return res
  })
}

function getICameraFolder (token) {
  return RNFetchBlob.fetch('GET', `https://www.googleapis.com/drive/v3/files?q='root' in parents and trashed=false`, {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }).then((res) => {
    if (res && JSON.parse(res.data).files) {
      const data = JSON.parse(res.data).files
      // Reactotron.log(JSON.parse(res.data).files)
      var findIcam = _.find(data, { name: 'ICamera' })
      if (findIcam === undefined) {
        RNFetchBlob.fetch('POST', 'https://www.googleapis.com/drive/v3/files/', {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, JSON.stringify({
          name: `ICamera`,
          mimeType: 'application/vnd.google-apps.folder'
        })).then((res) => {
          Reactotron.log(JSON.parse(res.data).id)
          return res
        })
      } else {
        return findIcam.id
      }
    }
    Reactotron.log('fin')
    return res
  })
}

function getFolderFromApi (token, parent, specialEmail) {
  const qwerty = specialEmail ? `and '${specialEmail}' in writers` : ''
  return RNFetchBlob.fetch('GET', `https://www.googleapis.com/drive/v3/files?q='${parent}' in parents and trashed=false and mimeType='application/vnd.google-apps.folder' ${qwerty}`, {
    // return RNFetchBlob.fetch('GET', `https://www.googleapis.com/drive/v3/files?q='root' in parents and trashed=false and 'littlepjg@gmail.com' in writers`, {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'mimeType': 'application/vnd.google-apps.folder'
  }).then((res) => {
    Reactotron.log('call Api get folder')
    Reactotron.log(res)
    return res
  })
}

// https://developers.google.com/drive/v3/reference/permissions/create#request
function requestShareFolderToEmail (token, idFolder, emailShare) {
  Reactotron.log('requestShareFolderToEmail')
  Reactotron.log(token)
  Reactotron.log(idFolder)
  Reactotron.log(emailShare)
  // const qwerty = specialEmail ? `and '${specialEmail}' in writers` : ''
  return RNFetchBlob.fetch('POST', `https://www.googleapis.com/drive/v3/files/${idFolder}/permissions`, {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
    JSON.stringify({
      'role': 'writer', // owner, writer, commenter, reader
      'type': 'user',
      'emailAddress': `${emailShare}`
    }))
    .then((res) => {
      Reactotron.log('call Api shared with specical email')
      Reactotron.log(res)
      return res
    })
}

export const Api = {
  upVideoFromApi,
  createFolderFromApi,
  getFolderFromApi,
  getICameraFolder,
  requestShareFolderToEmail
}
