import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View, Text, Modal, TextInput } from 'react-native';
import Camera from 'react-native-camera';
import styles from './styles/styles'
import RNFetchBlob from 'react-native-fetch-blob'
import base64js from 'base64-js'
import axios from 'axios'
import { create } from 'apisauce'
import { upLoadVideo, setAccount } from '../actions'
import { connect } from 'react-redux'
import Reactotron from 'reactotron-react-native'
// import Modal from "react-native-modal"
import ModalBox from 'react-native-modalbox'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import Spinner from 'react-native-loading-spinner-overlay'
import RNThumbnail from 'react-native-thumbnail'
// import ProgressCircle from 'react-native-progress-circle'
import * as Progress from 'react-native-progress'


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
      imageData: '',
      isModalVisible: false,
      isModalLogin: false,
      isLoading: false,
      isModalProgress: false,
      isModalInputName: false,
      videoName: ''
    };
  }


  componentWillMount() {
    if (!this.props.account.accessToken) {
      this.setState({ isModalLogin: true })
    }
    GoogleSignin.hasPlayServices({ autoResolve: true })
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.appdata'
      ],
      iosClientId: '289699507010-vuegtvgmi10s5es4i2iou4ifbakeqdae.apps.googleusercontent.com',
      webClientId: '289699507010-os4tp96n6ncukufpckdk4s855jbiaus2.apps.googleusercontent.com',  // <= get it on google-services.json
      shouldFetchBasicProfile: true
    })
  }

  componentWillReceiveProps(newProps) {
    Reactotron.log('newProps')
    Reactotron.log(newProps)
    if (newProps && newProps.account.length === 0) {
      this.setState({ isModalLogin: true })
    }
    if (newProps && newProps.account.length !== 0) {
      this.setState({ isModalLogin: false })
    }
    if (newProps.progress) {
      Reactotron.log('progress')
      Reactotron.log(newProps.progress)
      this.setState({ progress: newProps.progress, isModalProgress: true })
    }
    if (newProps && newProps.videoData) {
      if (newProps.videoData.error && newProps.videoData.error.message === 'Invalid Credentials') {
        Reactotron.log('w')
        this.setState({ isModalProgress: false, failedLogin: true, isModalLogin: true, isLoading: false, isModalProgress: false })
      }
      if (newProps.videoData && newProps.videoData.length !== 0) {
        Reactotron.log('newProps.videoData')
        Reactotron.log(newProps.videoData)
        this.setState({ videoData: newProps.videoData[0], isLoading: false, isModalProgress: false })
        alert(`Upload success \n with id video: ${newProps.videoData[0].id} \n name: ${newProps.videoData[0].name}`)
      }
    }


  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => this.setState({ imageData: data, path: data.path, isVideoFile: false}))
        // .then(data => Reactotron.log(data))
        .catch(err => console.error(err));
    }
  };

  startRecording = () => {
    if (this.camera) {
      this.camera
        .capture({ mode: Camera.constants.CaptureMode.video })
        .then(data => this.setState({ path: data.path, isVideoFile: true }, this.getThumbnailVideo(data.path)))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true,
      });
    }
  };

  getThumbnailVideo(filepath) {
    RNThumbnail.get(filepath).then((result) => {
      return this.setState({ thumbnailVideo: result.path })
      // Reactotron.log('result.path'); // thumbnail path
      // Reactotron.log(result.path); // thumbnail path
    })
  }

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




  async handleSigninGoogle() {
    this.setState({ isLoading: true })
    try {
      await GoogleSignin.signIn().then((user) => {
        // console.log(user)
        // Reactotron.log(user)
        this.props.setAccount(user)
        this.setState({ isModalLogin: false, token: user.accessToken, isLoading: false })
      })
      // await this.props.navigation.navigate('CameraScreen')
    } catch (error) {
      Reactotron.log(`Error = ${error}`)
    }
  }


  onUploadPress(token) {
    const {videoName, path, isVideoFile} = this.state
    if (videoName === '') {
      alert('please input your name video!')
      return
    }
    const fileType =  isVideoFile ? 'mp4' : 'jpeg'
    this.setState({ isModalInputName: false })
    this.props.onUpVideo(token, path, videoName, fileType)
  }

  onPressPreview() {
    const { path, isModalVisible } = this.state
    if (path) {
      this.setState({ isModalVisible: !isModalVisible })
    } else alert('Please Record Video!')
  }

  render() {
    const { imageData, isRecording, isModalVisible, thumbnailVideo } = this.state
    // Reactotron.log(imageData&&imageData)
    const thumbnail = imageData && imageData.mediaUri || thumbnailVideo ? { uri: imageData.mediaUri || thumbnailVideo } : require('../assets/icVideoColor.png')
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
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
          <TouchableOpacity style={styles.warpPreviewAfter} onPress={() => this.onPressPreview()}>
            <Image source={thumbnail} style={styles.previewAfterStyle} />
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
        <ModalBox style={styles.modal}
          position={"center"}
          swipeToClose={false}
          isOpen={this.state.isModalVisible}>
          <View style={{ flex: 1, borderRadius: 5 }}>
            <Image
              source={imageData && imageData.mediaUri || thumbnailVideo ? { uri: imageData.mediaUri || thumbnailVideo } : require('../assets/icVideoColor.png')}
              style={styles.previewBigStyle}
              resizeMode='contain'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => this.setState({isModalInputName: true, isModalVisible: false})}>
                <Image source={require('../assets/icUploadNew.png')} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isModalVisible: false })}>
                <Image source={require('../assets/icCancelNew.png')} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
            </View>
          </View>
        </ModalBox>

        <ModalBox
          style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
          swipeToClose={false}
          position={"center"}
          isOpen={this.state.isModalLogin}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleSigninGoogle()}>
                <Text style={styles.textButtonStyle}>Sign in with Google +</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalBox>

        <ModalBox
          style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
          swipeToClose={false}
          position={"center"}
          // startOpen={true}
          isOpen={this.state.isModalProgress}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Progress.Circle progress={this.state.progress} showsText={true} size={80} />
          </View>
        </ModalBox>

        <ModalBox
          style={styles.modalInputName}
          swipeToClose={false}
          position={"center"}
          // startOpen={true}
          isOpen={this.state.isModalInputName}>
          <View style={styles.contentModalInput}>
            <Text style={styles.txtHeaderModalInput}>Please input your video name to upload</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => this.setState({ videoName: text })}
              value={this.state.videoName}
              underlineColorAndroid='transparent'
              placeholder='Input your video name'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => this.onUploadPress(this.state.token)}>
                <Image source={require('../assets/icUploadNew.png')} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isModalInputName: false })}>
                <Image source={require('../assets/icCancelNew.png')} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </View>
          </View>
        </ModalBox>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer,
    videoData: state.videoReducer,
    progress: state.progressReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpVideo: (token, video, videoName, fileType) => { dispatch(upLoadVideo(token, video, videoName, fileType)) },
    setAccount: (account) => { dispatch(setAccount(account)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)