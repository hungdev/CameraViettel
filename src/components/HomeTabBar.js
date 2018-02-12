import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
// import { Thumbnail } from 'native-base'
import HideWithKeyboard from './HideWithKeyboard'
// import { Colors, Images } from '../Themes/'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Ionicons from 'react-native-vector-icons/Ionicons'

// var tabIcons = []
export default class HomeTabBar extends Component {
  // propTypes: {
  //   goToPage: React.PropTypes.func,
  //   activeTab: React.PropTypes.number,
  //   tabs: React.PropTypes.array
  // },

  // _onTabChat () {
  //   if (this.props.onTab) this.props.onTab()
  // }

  render () {
    return (
      <HideWithKeyboard>
        <View style={[styles.tabs, this.props.style]}>
          {
            this.props.tabs.map((tab, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => this.props.goToPage(i)}
                  style={[styles.tab, {backgroundColor: this.props.activeTab === i ? '#DCEBFC' : '#C1D3E8'}]}>
                  {/* <Icon
                    name={tab.icon}
                    size={25}
                    color={this.props.activeTab === i ? '#fff' : 'rgba(200,200,200, 0.5)'}
                  /> */}
                  <View style={this.props.activeTab === i ? styles.iconActive : styles.icon}>
                    {
                      <Image style={[styles.imgIcon, tab.imgStyle]} source={tab.iconImage ? tab.iconImage : require('../assets/disable-white.png')} />
                    }
                  </View>
                  <Text style={this.props.activeTab === i ? styles.titleActive : styles.title}>
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
          {/* <TouchableOpacity onPress={() => this._onTabChat()} style={styles.tab}>
            <View style={styles.icon}>
              <Image square size={20} source={Images.speechBubble} />
            </View>
            <Text style={styles.title}>
              {I18n.t('chat')}
            </Text>
          </TouchableOpacity> */}
        </View>
      </HideWithKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  tabs: {
    height: 70,
    flexDirection: 'row',
    // backgroundColor: Colors.primaryColor
    // backgroundColor: Colors.primaryColor,
    backgroundColor: '#DCEBFC'
  },
  title: {
    // color: 'rgba(200,200,200, 0.5)'
    color: 'black'
  },
  titleActive: {
    color: '#25AAE1'
  },
  icon: {
    opacity: 0.4
  },
  iconActive: {

  },
  imgIcon: {
    height: 20,
    width: 20
  }
})
