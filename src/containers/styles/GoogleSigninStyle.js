import { StyleSheet, Platform } from 'react-native'
// import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    // marginTop: 60,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  warpInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  avatar: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderRadius: 40
  },
  btnLogout: {
    borderWidth: 1,
    marginTop: 10
  },
  txtLogout: {
    padding: 15,
    color: 'red'
  },

  // modal
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
