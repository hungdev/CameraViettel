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
    borderRadius: 40
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
    // alignItems: 'center'
  },

  btnLogout: {
    borderWidth: 1,
    marginTop: 10,
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
