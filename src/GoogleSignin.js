import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

export default class App extends Component {
  componentWillMount () {
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
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleSigninGoogle()}>
          <Text style={styles.textButtonStyle}>Sign in with Google +</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleSigninGoogle () {
    GoogleSignin.signIn().then((user) => {
      console.log(user)
    }).catch((err) => {
      console.log('WRONG SIGNIN', err)
    }).done()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonStyle: {
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F00',
    borderRadius: 5
  },
  textButtonStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  }
})
