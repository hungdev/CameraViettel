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
    height: 470,
    width: 300
  },
  previewBigStyle: {
    height: 400,
    width: 300
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
  }
})
