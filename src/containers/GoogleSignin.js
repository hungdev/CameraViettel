import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Clipboard, TextInput, FlatList } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from 'react-redux'
import Reactotron from 'reactotron-react-native'
import { setToken, setAccount, setLogout, createFolder, getFolder } from '../actions'
import styles from './styles/GoogleSigninStyle'
import ModalBox from 'react-native-modalbox'
import Toast from 'react-native-root-toast'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'

class GoogleSignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalLogin: false,
      isModalInputName: false
    }
  }

  componentWillMount () {
    const { account } = this.props
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
      this.props.getFolder(account.accessToken)
    }
  }

  componentWillReceiveProps (newProps) {
    Reactotron.log('google sigin')
    Reactotron.log(newProps)
    if (newProps && newProps.account.length !== 0) {
      this.setState({ isModalLogin: false })
    }

    if (newProps && newProps.folders.length !== 0) {
      this.setState({ folders: newProps.folders, folderSelected: newProps.folders[0].id })
    }
    // if(newProps && newProps)
  }

  onLogOut () {
    this.props.setLogout()
    this.setState({ isModalLogin: true })
    // this.props.onLogout()
    // this.refs.Camerascreen.onOpenModalLogin()
  }
  onClipboard () {
    Clipboard.setString('https://drive.google.com/drive/folders/1rv5rmnhoeghcW41c1KNjO7nLR98XzmNh?usp=sharing')
    let toast = Toast.show('Link copied', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    })

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
      Toast.hide(toast)
    }, 1000)
  }

  onCreateFolder () {
    const { account } = this.props
    const { folderName } = this.state
    this.setState({ isModalInputName: false })
    this.props.createFolder(account.accessToken, folderName)
  }

  renderFolders (item) {
    const {folderSelected} = this.state
    return (
      <View style={styles.warpContent}>
        <TouchableOpacity style={styles.rowContent} onPress={() => this.setState({folderSelected: item.id})}>
          <View style={styles.folderNameStyle}>
            <Text>{item.name}</Text>
          </View>
          <Ionicons name='md-checkmark-circle-outline' size={30} color={folderSelected === item.id ? 'green' : 'grey'} />
          {/* <Text style={styles.txtLabel}>Path</Text>
          <View style={styles.warpRowPath}>
            <Text style={{ flex: 1 }}>https://drive.google.com/drive/folders/1rv5rmnhoeghcW41c1KNjO7nLR98XzmNh?usp=sharing</Text>
            <TouchableOpacity onPress={() => this.onClipboard()}>
              <Image source={require('../assets/clipboard.png')} style={styles.iconClipboard} />
            </TouchableOpacity>
          </View> */}
        </TouchableOpacity>
      </View>
    )
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
          <FlatList
            data={folders}
            extraData={this.state}
            renderItem={({ item }) => this.renderFolders(item)}
            keyExtractor={item => item.id}
          />
          {/* {
            account ? (
              <View style={styles.warpContent}>
                <View style={styles.rowContent}>
                  <Text style={styles.txtLabel}>Folder name</Text>
                  <Text style={styles.txtValue}>Viettel</Text>
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.txtLabel}>Path</Text>
                  <View style={styles.warpRowPath}>
                    <Text style={{ flex: 1 }}>https://drive.google.com/drive/folders/1rv5rmnhoeghcW41c1KNjO7nLR98XzmNh?usp=sharing</Text>
                    <TouchableOpacity onPress={() => this.onClipboard()}>
                      <Image source={require('../assets/clipboard.png')} style={styles.iconClipboard} />
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
              ) : null
            } */}
          <TouchableOpacity style={styles.warpAddButton} onPress={() => this.setState({ isModalInputName: !this.state.isModalInputName })}>
            <Foundation name='folder-add' size={50} color='black' />
          </TouchableOpacity>
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
      </View>
    )
  }

  async handleSigninGoogle () {
    try {
      await GoogleSignin.signIn().then((user) => {
        this.props.setAccount(user)
        this.setState({ isModalLogin: false, token: user.accessToken })
        this.props.getFolder(user.accessToken)
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
    folders: state.folderReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount: (account) => { dispatch(setAccount(account)) },
    setLogout: () => { dispatch(setLogout()) },
    createFolder: (account, folderName) => { dispatch(createFolder(account, folderName)) },
    getFolder: (account) => { dispatch(getFolder(account)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)
