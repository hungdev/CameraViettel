import { StyleSheet, Platform, Dimensions } from 'react-native'
// import { Colors, Metrics, Fonts } from '../../Themes/'
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
  modalInputName: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    backgroundColor: 'transparent'
  },
  contentModalInput: {
    // height: '75%',
    // width: '90%',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff'
  },
  txtHeaderModalInput: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 15
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3
  },
  rowInput: {
    marginVertical: 8
  },
  txtLabel: {
    color: 'blue'
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 20
  },
  buttonStyle: {
    // borderWidth: 1,
    padding: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#5F93E4'
  },
  txtButton: {
    color: '#fff'
  }

})
