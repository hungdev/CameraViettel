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
    width: '100%',
    paddingVertical: 30
  },
  warpContent: {
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 5

    // borderTopWidth: 1,
    // borderTopColor: 'grey',
    // paddingTop: 20
  },
  rowContent: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,

    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
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
  },
  //
  warpAddButton: {
    borderTopWidth: 0,
    padding: 10,
    marginBottom: 70
  },
  // modal
  // modal input name
  modalInputName: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 200,
    width: 300,
    borderRadius: 5,
    padding: 10
  },
  contentModalInput: {
    // justifyContent: 'center',
    // alignItems: 'center'
    // height: 200,
    // width: 200
  },
  txtHeaderModalInput: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 15
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3
  },
  icLogout: {
    height: 50,
    width: 50
  },
  folderNameStyle: {
    flex: 1
  }
})
