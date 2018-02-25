import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Clipboard } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from 'react-redux'
import Reactotron from 'reactotron-react-native'
import { setToken, setAccount, setLogout } from '../actions'
import styles from './styles/GoogleSigninStyle'
import Modal from 'react-native-modalbox'
import Toast from 'react-native-root-toast'

class GoogleSignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalLogin: false
    }
  }

  componentWillMount () {
    setTimeout(() => {
      if (!this.props.account.accessToken) {
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

  render () {
    const { account } = this.props
    return account && (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <View style={styles.warpInfo}>
          <View style={styles.warpHeader}>
            <Image source={{ uri: account.photo }} style={styles.avatar} />
            <View style={styles.rowStyle}>
              <Text style={styles.txtHeader}>{account && account.name ? account.name.charAt(0).toUpperCase() + account.name.slice(1) : null}</Text>
            </View>
            <Text style={styles.txtHeader}>{account && account.email ? account.email : null}</Text>
          </View>
          {
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
          }
          <TouchableOpacity style={styles.btnLogout} onPress={() => this.onLogOut()}>
            <Text style={styles.txtLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Modal
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
        </Modal>
      </View>
    )
  }

  async handleSigninGoogle () {
    try {
      await GoogleSignin.signIn().then((user) => {
        this.props.setAccount(user)
        this.setState({ isModalLogin: false })
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
    videoData: state.videoReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount: (account) => { dispatch(setAccount(account)) },
    setLogout: () => { dispatch(setLogout()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)
