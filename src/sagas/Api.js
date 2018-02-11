import { create } from 'apisauce'
import RNFetchBlob from 'react-native-fetch-blob'
import base64js from 'base64-js'
import axios from 'axios'
import Reactotron from 'reactotron-react-native'

function encodeFile (videoFile) {
  const fs = RNFetchBlob.fs
  return fs.readStream(videoFile, 'base64', 1024000)
};

function funcUp (token, encodedData) {
  let byteBuffers = base64js.toByteArray(encodedData)
  const api = create({
    baseURL: 'https://www.googleapis.com',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'video/mp4',
      'Content-Length': byteBuffers.length
    },
    timeout: 10000
  })
  return api.post(`/upload/drive/v3/files/`, { data: byteBuffers })
};
async function upVideoFromApi (token, video) {
  const encodedData = await new Promise((resolve, reject) => {
    encodeFile(video).then((stream) => {
      let buffer = ''
      stream.open()
      stream.onData((chunk) => {
        buffer += chunk
      })
      stream.onEnd(() => {
        console.log('stream end')
        resolve(buffer)
      })
    })
  })
  return funcUp(token, encodedData)
}

// function * upVideoFromApi (token, video) {
//   encodeFile(video)
//     .then((stream) => {
//       let encodedData = ''
//       stream.open()
//       stream.onData((chunk) => {
//         encodedData += chunk
//       })
//       stream.onEnd(() => {
//         console.log('stream end')

//         funcUp(token, encodedData)
//           .then((response) => {
//             return response
//           })
//       })
//     })
// }
// async function upVideoFromApi (token, video) {
//   const stream = await RNFetchBlob.fs.readStream(video, 'base64', 1024000)
//   stream.open()
//   let encodedData = ''
//   stream.onData((chunk) => {
//     encodedData += chunk
//   })
//   stream.onEnd(() => {
//     console.log('stream end')
//     const response = funcUp(token, encodedData)
//     return response
//   })
// }

export const Api = {
  upVideoFromApi
}
