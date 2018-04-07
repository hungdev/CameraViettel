import { StyleSheet, Platform } from 'react-native'
// import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  typeButton: {
    padding: 5
  },
  flashButton: {
    padding: 5
  },
  buttonsSpace: {
    width: 10
  },
  //
  warpPreviewAfter: {
    position: 'absolute',
    left: 10,
    bottom: 20
  },
  previewAfterStyle: {
    height: 60,
    width: 60

  },
  // modal
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: '80%',
    width: '80%',
    borderRadius: 10
  },
  previewBigStyle: {
    height: '80%',
    width: '100%'
  },
  // button
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
  // Signin Button
  containerSignIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonSignInStyle: {
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F00',
    borderRadius: 5
  },
  textButtonSignInStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  },
  // modal input name

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
  //
  warpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#E9E5E9',
    borderBottomWidth: 1
  }

})
