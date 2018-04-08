import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View, Text, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import Camera from 'react-native-camera';
import styles from './styles/styles'
import RNFetchBlob from 'react-native-fetch-blob'
import base64js from 'base64-js'
import axios from 'axios'
import { create } from 'apisauce'
import { upLoadVideo, setAccount, setNull, getFolder, getICameraFolder, getFileInfolder } from '../actions'
import { connect } from 'react-redux'
import Reactotron from 'reactotron-react-native'
// import Modal from "react-native-modal"
import ModalBox from 'react-native-modalbox'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import Spinner from 'react-native-loading-spinner-overlay'
import RNThumbnail from 'react-native-thumbnail'
// import ProgressCircle from 'react-native-progress-circle'
import * as Progress from 'react-native-progress'
import ModalPicker from './ModalPicker'
import ModalInputFileName from './ModalInputFileName'
import _ from 'lodash'
import Toast from 'react-native-root-toast'


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
    this.forceUpdate()
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
      if (!newProps.fetching) {
        this.setState({ isModalProgress: false })
      } else {
        this.setState({ progress: newProps.progress, isModalProgress: true })
      }
    }

    if (this.state.isUploading && !newProps.fetching) {
      this.setState({ isUploading: false })
      if (newProps.isSuccess) {
        this.setState({ isLoading: false, isModalProgress: false, isGetFolder: true, isGetFileInfolder: true })
        // alert(`Upload success \n with id file: ${newProps.videoData.data.id} \n name: ${newProps.videoData.data.name}`)
        Toast.show(`Upload success with file name: ${newProps.videoData.data.name}`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0
        })
        this.props.getFileInfolder (newProps.account.accessToken, newProps.selectedFolder)
        // this.props.getFolder(newProps.account.accessToken, newProps.iCamFolder)
      } else {
        alert(`err: ${newProps.error}`)
      }
    }

    if (this.state.isGetICamera && !newProps.iFetching) {
      this.setState({ isGetICamera: false, isGetFolder: true })
      this.props.getFolder(newProps.account.accessToken, newProps.iCamFolder)
    }

    if (this.state.isGetFolder && !newProps.iFetching) {
      this.setState({ isGetFolder: false })
      // Reactotron.log('ffff')
      // Reactotron.log(newProps)
    }

    if (this.state.isGetFileInfolder && !newProps.iFetching) {
      this.setState({isGetFileInfolder: false})
      Reactotron.log('rcp isGetFileInfolder')
      Reactotron.log(newProps.fileInFolder)
      Reactotron.log('sttttt')
      Reactotron.log(this.state.fileType)
      let sortType = _.filter(newProps.fileInFolder, e =>  {
        let splitType = e.mimeType.split("/", 2)
        let fileType = splitType[0]
        if (this.state.fileType === fileType) {
          return e
        } 
      })
      if (this.state.fileType === 'video') {
        if (sortType.length < 4) {
          alert(`bạn cần upload ít nhất 4 video, hiện tại mới có ${sortType.length} video`)
        } else {
          alert('Hoàn tất thủ tục các thao tác cần thiết để bán xe')
        }
      }
      if (this.state.fileType === 'image') {
        if (sortType.length < 3) {
          alert(`bạn cần upload ít nhất 3 ảnh, hiện tại mới có ${sortType.length} ảnh`)
        } else {
          alert('Hoàn tất thủ tục các thao tác cần thiết để bán xe')
        }
      }
      this.props.getFolder(newProps.account.accessToken, newProps.iCamFolder)
    }

    // if ()
    // if (newProps && newProps.videoData) {
    //   if (newProps.videoData.error && newProps.videoData.error.message === 'Invalid Credentials') {
    //     Reactotron.log('w')
    //     this.setState({ isModalProgress: false, failedLogin: true, isModalLogin: true, isLoading: false, isModalProgress: false })
    //   }
    //   if (newProps.videoData && newProps.videoData.length !== 0) {
    //     Reactotron.log('newProps.videoData')
    //     Reactotron.log(newProps.videoData)
    //     this.setState({ videoData: newProps.videoData[0], isLoading: false, isModalProgress: false })
    //     alert(`Upload success \n with id file: ${newProps.videoData[0].id} \n name: ${newProps.videoData[0].name}`)
    //     this.props.setNull()
    //   }
    // }


  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => this.setState({ thumbnailFile: data.mediaUri, path: data.path, isVideoFile: false }))
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
      return this.setState({ thumbnailFile: result.path })
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
    Reactotron.log('1 Sc Cam handleSigninGoogle')
    try {
      await GoogleSignin.signIn().then((user) => {
        Reactotron.log('2 Sc Cam handleSigninGoogle')
        Reactotron.log(user)
        this.props.setAccount(user)
        // this.props.getFolder(user.accessToken)
        this.setState({ isModalLogin: false, isLoading: false, isGetICamera: true })
        this.props.getICameraFolder(user.accessToken)

      })
      // await this.props.navigation.navigate('CameraScreen')
    } catch (error) {
      Reactotron.log(`Error = ${error}`)
    }
  }


  onPressUpload(fileName) {
    const { item } = this.state
    const { iCamFolder, account, selectedFolder } = this.props
    const arrPath = item.node.type.split("/", 2)
    const pathString = arrPath[1]
    const fileType = arrPath[0]
    if (fileName === '') {
      alert('please input your file name!')
      return
    }
    // const fileType = isVideoFile ? 'mp4' : 'jpeg'
    this.setState({ isModalInputName: false, isUploading: true, fileType })
    const parent = selectedFolder ? selectedFolder : iCamFolder
    //path: đường dẫn
    // pathString là đuôi file
    // fileType là loại file: image hoặc video
    var path = item.node.image.uri
    this.refs.ModalInputName.onClose()
    this.props.onUpVideo(account.accessToken, path, fileName, pathString, parent)
    // this.props.onUpVideo(token, path, videoName, fileType)
  }


  onSelectedItem(item) {
    this.refs.ModalInputName.onOpen()
    this.refs.ModalPicker.onClose()
    this.setState({ item })
  }

  onPressPreview() {
    const { iCamFolder, account, selectedFolder } = this.props
    if (selectedFolder) {
      this.refs.ModalPicker.onOpen()
    } else {
      alert('Bạn phải tạo hoặc chọn folder bên tab Profile để upload')
      return
    }
  }

  render() {
    const { isRecording, isModalVisible, thumbnailVideo, thumbnailFile } = this.state
    const thumbnail = thumbnailFile ? { uri: thumbnailFile } : require('../assets/icVideoColor.png')
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
          // isOpen={true}>
          isOpen={this.state.isModalVisible}>
          <View style={{ height: '100%', width: '100%' }}>
            <View style={styles.warpHeader}>
              <TouchableOpacity onPress={() => this.setState({ isModalVisible: false })}>
                <Text style={{ color: 'black' }}>Done</Text>
              </TouchableOpacity>
              {/* <Text>Upload</Text> */}
              <TouchableOpacity onPress={() => this.setState({ isModalInputName: true, isModalVisible: false })}>
                <Image source={require('../assets/icUploadIos.png')} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
            </View>
            <Image
              source={thumbnail}
              style={styles.previewBigStyle}
              resizeMode='contain'
            />
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


        <ModalInputFileName
          ref='ModalInputName'
          onPressUpload={(fileName) => this.onPressUpload(fileName)}
        />
        <ModalPicker
          ref='ModalPicker'
          onSelectedItem={(item) => this.onSelectedItem(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer,
    videoData: state.videoReducer,
    progress: state.progressReducer,
    fetching: state.videoReducer.fetching,
    isSuccess: state.videoReducer.isSuccess,
    error: state.videoReducer.error,
    iCamFolder: state.folderReducer.iCamFolder,
    iFetching: state.folderReducer.fetching,
    iIsSuccess: state.folderReducer.isSuccess,
    iError: state.folderReducer.error,
    folders: state.folderReducer.folders,
    selectedFolder: state.folderReducer.selectedFolder,
    fileInFolder: state.folderReducer.fileInFolder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpVideo: (token, video, videoName, fileType, parent) => { dispatch(upLoadVideo(token, video, videoName, fileType, parent)) },
    setAccount: (account) => { dispatch(setAccount(account)) },
    getFolder: (account, parent) => { dispatch(getFolder(account, parent)) },
    getICameraFolder: (account) => { dispatch(getICameraFolder(account)) },
    getFileInfolder: (token, parent) => { dispatch(getFileInfolder(token, parent)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)