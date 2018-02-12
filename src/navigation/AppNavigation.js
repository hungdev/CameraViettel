import React from 'react'
import { Button, View, Text } from 'react-native'
import { StackNavigator, TabNavigator} from 'react-navigation'
// Manifest of possible screens
import CameraScreen from '../containers/CameraScreen'
import GoogleSignin from '../containers/GoogleSignin'
import HomeScreen from '../containers/HomeScreen'

const PrimaryNav = StackNavigator({
  CameraScreen: {
    screen: CameraScreen
  },
  GoogleSignin: { screen: GoogleSignin },
  HomeScreen: { screen: HomeScreen }
}, {
    // Default config for all screens
    // headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    // headerStyle: styles.header
  }
})

export default PrimaryNav
