import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Clipboard, TextInput, FlatList } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from 'react-redux'
import Reactotron from 'reactotron-react-native'
import { setAccount, setLogout, createFolder, getFolder, getICameraFolder, setSelectedFolder, shareToEmail } from '../actions'
import styles from './styles/GoogleSigninStyle'
import ModalBox from 'react-native-modalbox'
import Toast from 'react-native-root-toast'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalInputFolderName from './ModalInputFolderName'
import Spinner from 'react-native-loading-spinner-overlay'

class GoogleSignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalLogin: false,
      isModalInputName: false,
      isModalInputEmail: false
    }
  }

  componentWillMount () {
    Reactotron.log('will mount GG signin')
    const { account } = this.props
    // this.props.setNull()
    setTimeout(() => {
      if (!account.accessToken) {
        this.setState({ isModalLogin: true })
      }
    }, 700)
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
    if (account && account.accessToken) {
      this.setState({ isGetFolder: true })
      this.props.getFolder(account.accessToken, this.props.iCamFolder)
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    const { account } = this.props
    Reactotron.log(' RCP google sigin')
    Reactotron.log(newProps)
    if (newProps && newProps.account.length !== 0) {
      this.setState({ isModalLogin: false })
    }

    if (this.state.isCreateFolder && !newProps.fetching) {
      this.setState({ isCreateFolder: false, isLoading: false })
      this.refs.ModalInputFolderName.onClose()
      if (newProps.isSuccess) {
        if (newProps.createFolderData) {
          this.setState({ isGetFolder: true, folderSelected: newProps.createFolderData.id })
          this.props.setSelectedFolder(newProps.createFolderData.id)
          this.props.shareToEmail(account.accessToken, newProps.createFolderData.id, 'phambinht1hvt@gmail.com')
          this.props.getFolder(newProps.account.accessToken, newProps.iCamFolder)
          alert('create folder success')
        }
      } else {
        alert(`err: ${newProps.error}`)
      }
    }

    if (this.state.isGetICamera && !newProps.fetching) {
      this.setState({ isGetICamera: false, isGetFolder: true })
      this.props.getFolder(newProps.account.accessToken, newProps.iCamFolder)
    }

    if (this.state.isGetFolder && !newProps.fetching) {
      this.setState({ isGetFolder: false })
    }

    if (newProps.folders && newProps.folders.length !== 0) {
      // this.setState({ folders: newProps.folders, folderSelected: newProps.folders[0].id })
      this.setState({ folders: newProps.folders })
      // this.props.setSelectedFolder(newProps.folders[0].id)
    }

    if (this.state.isShareToEmail && !newProps.fetching) {
      this.setState({ isShareToEmail: false })
      if (newProps.emailShared.respInfo.status === 200) {
        alert('Share success')
      }
    }
  }

  onLogOut () {
    this.props.setLogout()
    this.setState({ isModalLogin: true })
    // this.props.onLogout()
    // this.refs.Camerascreen.onOpenModalLogin()
  }
  onClipboard () {
    const { folderSelected } = this.state
    Clipboard.setString(`https://drive.google.com/drive/folders/${folderSelected}?usp=sharing`)
    let toast = Toast.show('Link copied', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    })

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
      Toast.hide(toast)
    }, 1000)
  }

  onCreateFolder (folderName) {
    const { account, iCamFolder } = this.props
    // const { folderName } = this.state
    this.setState({ isCreateFolder: true, isLoading: true })
    this.props.createFolder(account.accessToken, folderName, iCamFolder)
  }

  onSelectFolder (item) {
    // if (item.id === this.state.folderSelected) {
    //   this.setState({ folderSelected: this.props.iCamFolder })
    //   this.props.setSelectedFolder(this.props.iCamFolder)
    // } else {
    this.setState({ folderSelected: item.id })
    this.props.setSelectedFolder(item.id)
    // }
  }

  renderFolders (item) {
    const { folderSelected } = this.state
    return (
      <View style={styles.warpContent}>
        <View style={styles.rowContent} >
          <View style={styles.folderNameStyle}>
            <Text>{item.name}</Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ isModalInputEmail: !this.state.isModalInputEmail, idFolder: item.id })}>
            <Ionicons name='md-share' size={30} style={{ marginRight: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelectFolder(item)}>
            <Ionicons name='md-checkmark-circle-outline' size={30} color={folderSelected === item.id ? 'green' : 'grey'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onSearch () {
    const { account, iCamFolder } = this.props
    Reactotron.log('eeeeex')
    Reactotron.log(this.state.specialEmail)
    const specialEmail = this.state.specialEmail ? this.state.specialEmail : null
    this.setState({ isGetFolder: true })
    this.props.getFolder(account.accessToken, iCamFolder, specialEmail)
  }

  onShareEmail () {
    const { emailShare, idFolder } = this.state
    const { account } = this.props
    this.setState({ isModalInputEmail: false, isShareToEmail: true })
    this.props.shareToEmail(account.accessToken, idFolder, emailShare)
  }

  onOpenFolderInputName () {
    this.refs.ModalInputFolderName.onOpen()
  }

  render () {
    const { account } = this.props
    const { folders } = this.state
    return account && (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <View style={styles.warpInfo}>
          <View style={styles.warpHeader}>
            <Image source={{ uri: account.photo }} style={styles.avatar} />
            <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
              <View style={{ alignItems: 'center', flex: 1, marginLeft: 50 }}>
                <Text style={styles.txtHeader}>{account && account.name ? account.name.charAt(0).toUpperCase() + account.name.slice(1) : null}</Text>
                <Text style={styles.txtHeader}>{account && account.email ? account.email : null}</Text>
              </View>
              <TouchableOpacity onPress={() => this.onLogOut()}>
                <Image source={require('../assets/logout.png')} style={styles.icLogout} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.warpTextInput}>
            <TextInput
              style={styles.textInput}
              ref='searchText'
              autoFocus
              placeholder='Email share with special person'
              // placeholderTextColor='white'
              value={this.state.specialEmail}
              onChangeText={(text) => this.setState({ specialEmail: text })}
              autoCapitalize='none'
              onSubmitEditing={() => this.onSearch()}
              returnKeyType={'search'}
              autoCorrect={false}
              underlineColorAndroid='green'
            // selectionColor='white'
            />
            <TouchableOpacity onPress={() => this.onSearch()}>
              <Ionicons name='ios-send' size={40} color='grey' />
            </TouchableOpacity>
          </View>
          <FlatList
            data={folders}
            extraData={this.state}
            renderItem={({ item }) => this.renderFolders(item)}
            keyExtractor={item => item.id}
          />
          <View style={styles.rowBottom}>
            <TouchableOpacity style={[styles.warpAddButton]} onPress={() => this.onOpenFolderInputName()}>
              <Foundation name='folder-add' size={50} color='black' />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.warpAddButton]} onPress={() => this.onClipboard()}>
              <Image source={require('../assets/clipboard.png')} style={styles.iconClipboard} />
            </TouchableOpacity>
          </View>

        </View>
        <ModalBox
          style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
          swipeToClose={false}
          position={'center'}
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
          style={styles.modalInputName}
          swipeToClose={false}
          position={'center'}
          // startOpen={true}
          isOpen={this.state.isModalInputName}>
          <View style={styles.contentModalInput}>
            <Text style={styles.txtHeaderModalInput}>Please input your file name to upload</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => this.setState({ folderName: text })}
              value={this.state.folderName}
              underlineColorAndroid='transparent'
              placeholder='Input your file name'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => this.onCreateFolder()}>
                <Image source={require('../assets/icUploadNew.png')} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isModalInputName: false })}>
                <Image source={require('../assets/icCancelNew.png')} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </View>
          </View>
        </ModalBox>

        <ModalBox
          style={styles.modalInputName}
          swipeToClose={false}
          position={'center'}
          // startOpen={true}
          isOpen={this.state.isModalInputEmail}>
          <View style={styles.contentModalInput}>
            <Text style={styles.txtHeaderModalInput}>Share folder to email</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => this.setState({ emailShare: text })}
              value={this.state.emailShare}
              underlineColorAndroid='transparent'
              placeholder='Input your mail'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => this.onShareEmail()}>
                <Ionicons name='ios-create' size={40} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isModalInputEmail: false })}>
                <MCIcons name='cancel' size={35} />
              </TouchableOpacity>
            </View>
          </View>
        </ModalBox>

        <ModalInputFolderName
          ref='ModalInputFolderName'
          onCreate={(folderName) => this.onCreateFolder(folderName)}
        />
        <Spinner visible={this.state.isLoading} textContent={'Loading...'} textStyle={{color: '#FFF'}} />
      </View>
    )
  }

  async handleSigninGoogle () {
    try {
      await GoogleSignin.signIn().then((user) => {
        this.props.setAccount(user)
        this.setState({ isModalLogin: false, token: user.accessToken, isGetICamera: true })
        this.props.getICameraFolder(user.accessToken)
      })
      // await this.props.navigation.navigate('CameraScreen')
    } catch (error) {
      Reactotron.log(`Error = ${error}`)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer,
    videoData: state.videoReducer,
    iCamFolder: state.folderReducer.iCamFolder,
    fetching: state.folderReducer.fetching,
    isSuccess: state.folderReducer.isSuccess,
    emailShared: state.folderReducer.emailShared,
    error: state.folderReducer.error,
    createFolderData: state.folderReducer.createFolderData,
    folders: state.folderReducer.folders

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount: (account) => { dispatch(setAccount(account)) },
    setLogout: () => { dispatch(setLogout()) },
    createFolder: (account, folderName, parent) => { dispatch(createFolder(account, folderName, parent)) },
    getFolder: (account, parent, specialEmail) => { dispatch(getFolder(account, parent, specialEmail)) },
    getICameraFolder: (account) => { dispatch(getICameraFolder(account)) },
    setSelectedFolder: (folder) => { dispatch(setSelectedFolder(folder)) },
    shareToEmail: (token, idFolder, emailShare) => { dispatch(shareToEmail(token, idFolder, emailShare)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)
