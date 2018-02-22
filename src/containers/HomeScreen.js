import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Styles
import styles from './styles/HomeScreenStyle'
// import { Images, Colors } from '../Themes/index'
import CameraScreen from './CameraScreen'
import GoogleSignin from './GoogleSignin'
// import TabBarBottom from '../Components/TabBarBottom'
import HomeTabBar from '../components/HomeTabBar'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    header: false
    // headerTintColor: 'white'
  }
  // componentWillMount() {
  //   const { account } = this.props
  //   account && account.token ? '' : this.onChangeTab(2)
  // }

  onChangeTab(tab) {
    switch (tab.i) {
      case 0:
        // alert('0')
        break
      case 1:
        // alert('1')
        break
      default:
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarPosition='bottom'
          locked
          // prerenderingSiblingsNumber={Infinity}
          initialPage={0}
          renderTabBar={() => <HomeTabBar />}
          onChangeTab={(tab) => this.onChangeTab(tab)}
          ref={(tabView) => {
            if (tabView != null) {
              this.tabView = tabView
            }
          }}
        >
          <CameraScreen ref='tabCam' tabLabel={{ iconImage: require('../assets/icCamera.png'), title: 'Camera', imgStyle: styles.iconTabStyle }} />
          <GoogleSignin ref='tabSignIn' tabLabel={{ iconImage: require('../assets/icUser.png'), title: 'Profile', imgStyle: styles.iconTabStyle }} />
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer,
    // videoData: state.videoReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)