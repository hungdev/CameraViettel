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
  modalInputName: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 200,
    width: 300,
    borderRadius: 5,
    padding: 10
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
