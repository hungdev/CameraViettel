import React from 'react'
import { Button, View, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
// Manifest of possible screens
import CameraScreen from '../containers/CameraScreen'
import GoogleSignin from '../containers/GoogleSignin'

const PrimaryNav = StackNavigator({
  CameraScreen: {
    screen: CameraScreen
  },
  GoogleSignin: { screen: GoogleSignin }
}, {
    // Default config for all screens
    // headerMode: 'none',
  initialRouteName: 'GoogleSignin',
  navigationOptions: {
    // headerStyle: styles.header
  }
})

export default PrimaryNav
