import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Camera from 'react-native-camera';
import styles from './styles/styles'
import RNFetchBlob from 'react-native-fetch-blob'
import base64js from 'base64-js'
import axios from 'axios'
import { create } from 'apisauce'
import {upLoadVideo} from '../actions'
import { connect } from 'react-redux'
// import Reactotron from 'reactotron-react-native'

class CameraScreen extends React.Component {
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

  
  // componentWillMount () {
  //   Reactotron.log('hello rendering world')
  // }
  

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
        .then(data => this.setState({ path: data.path }))
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
  setToken = (token) => api.setHeader('Authorization', 'Bearer ' + token)
  setHeader = (token, byteBuffers) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'video/mp4',
    'Content-Length': byteBuffers.length
  })

  // funcUp(encodedData) {
  //   let byteBuffers = base64js.toByteArray(encodedData);
  //   const token = `ya29.GlxfBc164qanRsTOFWl6X2uExSvEKTR1qIKdl2g4ZazBg_ZxtyK5j79sFQsTalCQ_rKodbF16945VH7wWxO_uia1L1q65MiVC4G_63Jal72lT1szyndcdBxuT-yIug`
  //   api = create({
  //     baseURL: 'https://www.googleapis.com',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'video/mp4',
  //       'Content-Length': byteBuffers.length
  //     },
  //     timeout: 10000
  //   })
  //   // this.setToken(token)
  //   return api.post(`/upload/drive/v3/files/`, { data: byteBuffers })
  // };
  
  // onUpload() {
  //   const { path } = this.state
  //   this.encodeFile(path)
  //     .then((stream) => {
  //       let encodedData = '';
  //       stream.open();
  //       stream.onData((chunk) => {
  //         encodedData += chunk;
  //       })
  //       stream.onEnd(() => {
  //         console.log("stream end");
  //         this.funcUp(encodedData)
  //           .then((response) => {
  //             console.log("in post upload: ", response);
  //           })
  //       })
  //     })
  // }
  

  getFile() {
    const fileId = "1fZCD09AqOL_eBNMfg4bFS4kcCHqDcm4O"
    // let byteBuffers = base64js.toByteArray(encodedData);
    const token = `ya29.GlxfBebA727JZS7X25eBPTQeahqFxMIJsWBt32BuQWR104XkY48kUZPJpJ7lfEu6f2nUbxv3PNPFxKg-mMP4KQkdJliLKjdmcQFFcmz7XiXrarAlt51u1Q4hpyIqiw`
    api = create({
      baseURL: 'https://www.googleapis.com',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 10000
    })
    // this.setToken(token)
    // this.setToken(token)
    return api.get(`/drive/v3/files/${fileId}?alt=media`)
  }

  onGetLink() {
    this.getFile().then((response) => {
      console.log("data after get: ", response);
    })
  }


  render() {
    const { imageData, isRecording } = this.state
    const token ="ya29.GlxfBebA727JZS7X25eBPTQeahqFxMIJsWBt32BuQWR104XkY48kUZPJpJ7lfEu6f2nUbxv3PNPFxKg-mMP4KQkdJliLKjdmcQFFcmz7XiXrarAlt51u1Q4hpyIqiw"
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
          <TouchableOpacity style={styles.warpPreviewAfter} onPress={() => this.props.onUpVideo(token, this.state.path)}>
            <Image source={{ uri: imageData && imageData.mediaUri ? imageData.mediaUri : 'http://i.stack.imgur.com/WCveg.jpg' }} style={styles.previewAfterStyle} />
          </TouchableOpacity>
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

const mapStateToProps = (state) => {
  return {
    // token = state.accountReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpVideo: (token, video) => { dispatch(upLoadVideo(token, video)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)