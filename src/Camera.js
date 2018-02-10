import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Camera from 'react-native-camera';
import styles from './styles/styles'
// import RNFetchBlob from 'react-native-fetch-blob'
// import base64js from 'base64-js'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false,
      imageData: ''
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => this.setState({ imageData: data }))
        .catch(err => console.error(err));
    }
  };

  startRecording = () => {
    if (this.camera) {
      this.camera
        .capture({ mode: Camera.constants.CaptureMode.video })
        .then(data => console.log(data))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true,
      });
    }
  };

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
      });
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  };

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }

    return icon;
  }

  encodeFile(videoFile) {
    const fs = RNFetchBlob.fs;
    return fs.readStream(videoFile, 'base64', 1024000);
  }

  uploadFile = (token, fileId, encodedData) => {
    let byteBuffers = base64js.toByteArray(encodedData);
    return axios({
      method: 'patch',
      url: `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'video/mp4',
        'Content-Length': byteBuffers.length
      },
      data: byteBuffers,
    });
  };

  //https://github.com/wkh237/react-native-fetch-blob/issues/556
  // upload(fileId) {
  //   const apiUpload = `https://www.googleapis.com/upload/drive/v3/files/${fileId}`
  //   RNFetchBlob.fetch('POST', apiUpload, {
  //     Authorization: 'Bearer ' + token,
  //     // this is required, otherwise it won't be process as a multipart/form-data request
  //     'Content-Type': 'multipart/form-data'
  //   }, [
  //       // append field data from file path
  //       {
  //         name: 'image',
  //         filename: 'image.jpg',
  //         type: 'image/jpeg',
  //         // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
  //         // Or simply wrap the file path with RNFetchBlob.wrap().
  //         data: RNFetchBlob.wrap(photo)
  //       }
  //     ])
  // }
  render() {
    const { imageData, isRecording } = this.state
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          defaultTouchToFocus
          mirrorImage={false}
          cropToPreview={false}
          permissionDialogTitle="Sample title"
          permissionDialogMessage="Sample dialog message"
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity style={styles.typeButton} onPress={this.switchType}>
            <Image source={this.typeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton} onPress={this.switchFlash}>
            <Image source={this.flashIcon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {/* <TouchableOpacity style={styles.warpPreviewAfter} onPress={()=> alert('aa')}>
            <Image source={{ uri: imageData && imageData.mediaUri ? imageData.mediaUri : 'http://i.stack.imgur.com/WCveg.jpg' }} style={styles.previewAfterStyle} />
          </TouchableOpacity> */}
          {(!this.state.isRecording && (
            <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
              <Image source={require('../assets/ic_photo_camera_36pt.png')} />
            </TouchableOpacity>
          )) ||
            null}
          <View style={styles.buttonsSpace} />
          {(!this.state.isRecording && (
            <TouchableOpacity style={styles.captureButton} onPress={this.startRecording}>
              <Image source={require('../assets/ic_videocam_36pt.png')} />
            </TouchableOpacity>
          )) || (
              <TouchableOpacity style={styles.captureButton} onPress={this.stopRecording}>
                <Image source={require('../assets/ic_stop_36pt.png')} />
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  }
}
