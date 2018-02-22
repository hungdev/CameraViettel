import RNFetchBlob from 'react-native-fetch-blob'
import Reactotron from 'reactotron-react-native'
// docs: https://developers.google.com/drive/v3/reference/files/update
function upVideoFromApi (token, video) {
  return RNFetchBlob.fetch('POST', 'https://www.googleapis.com/upload/drive/v3/files', {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/octet-stream'
  }, RNFetchBlob.wrap(video))
    .then((res) => {
      const id = res.json().id
      return RNFetchBlob.fetch('PATCH', 'https://www.googleapis.com/drive/v3/files/' + id + '?addParents=1rv5rmnhoeghcW41c1KNjO7nLR98XzmNh&removeParents=root', {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, JSON.stringify({
        name: 'MyVideo.mp4'
      }))
    })
    .then((resp) => {
      return resp.json()
    })
}

export const Api = {
  upVideoFromApi
}
