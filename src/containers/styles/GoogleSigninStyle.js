import { StyleSheet, Platform, Dimensions } from 'react-native'
// import { Colors, Metrics, Fonts } from '../../Themes/'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    // marginTop: 60,
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  warpInfo: {
    // justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 70,
    // borderWidth: 1,
    height: height,
    width: width
  },
  warpHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4283f4',
    paddingTop: 70,
    paddingBottom: 30
  },
  warpContent: {
    width: width,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'grey',
    paddingTop: 20
  },
  rowContent: {
    flexDirection: 'row'
  },
  txtLabel: {
    flex: 3,
    borderWidth: 1,
    textAlign: 'center',
    borderRightWidth: 0,
    borderColor: '#BBB',
    paddingVertical: 10
    // color: '#4283f4'
  },
  txtValue: {
    flex: 7,
    borderWidth: 1,
    borderColor: '#BBB',
    paddingLeft: 20,
    paddingVertical: 10
  },
  iconClipboard: {
    height: 30,
    width: 30
  },
  txtHeader: {
    color: 'white'
  },
  warpRowPath: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7,
    borderWidth: 1,
    borderColor: '#BBB',
    paddingLeft: 20,
    paddingVertical: 10
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
    marginTop: 10
    // borderWidth: 1
    // alignItems: 'center'
  },
  btnLogout: {
    borderWidth: 1,
    marginTop: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#9ee59f',
    borderColor: 'grey'
  },
  txtLogout: {
    padding: 15,
    color: 'white'
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
