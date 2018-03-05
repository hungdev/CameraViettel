import { SET_TOKEN, UP_VIDEO, UP_SUCCEEDED, UP_FAILED, UP_PROGRESS } from '../actions/actionTypes'
import { put, takeLatest, call } from 'redux-saga/effects'
import RNFetchBlob from 'react-native-fetch-blob'
import Reactotron from 'reactotron-react-native'
import PromiseQueue from '../components/Queue'

// docs: https://developers.google.com/drive/v3/reference/files/update
function upVideoFromApi (token, video, videoName, fileType) {
  // Reactotron.log(video)
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
      return RNFetchBlob.fetch('PATCH', 'https://www.googleapis.com/drive/v3/files/' + id + '?addParents=1rv5rmnhoeghcW41c1KNjO7nLR98XzmNh&removeParents=root', {
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

export const Api = {
  upVideoFromApi
}
