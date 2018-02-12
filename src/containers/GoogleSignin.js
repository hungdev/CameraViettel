import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from 'react-redux'
import Reactotron from 'reactotron-react-native'
import { setToken, setAccount } from '../actions'
import styles from './styles/GoogleSigninStyle'
import Modal from 'react-native-modalbox'

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
    }, 1000)
    GoogleSignin.hasPlayServices({ autoResolve: true })
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.appdata'
      ],
      iosClientId: '617324734115-od9b4l2mf95331gg9m4u0a4gggq0fpjo.apps.googleusercontent.com',
      webClientId: '289699507010-os4tp96n6ncukufpckdk4s855jbiaus2.apps.googleusercontent.com',  // <= get it on google-services.json
      shouldFetchBasicProfile: true
    })
  }

  render () {
    const { account } = this.props
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <View style={styles.warpInfo}>
          <Image source={{ uri: account.photo }} style={styles.avatar} />
          <Text>{account.name}</Text>
          <Text>{account.email}</Text>
          <TouchableOpacity style={styles.btnLogout} onPress={() => alert('11')}>
            <Text style={styles.txtLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Modal
          style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
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
    setAccount: (account) => { dispatch(setAccount(account)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)
