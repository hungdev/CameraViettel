import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './styles/ModalInputNameStyle'
// import { Images, Colors } from '../Themes/index'
import ModalBox from 'react-native-modalbox'

export default class ModalInputName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      fileName: ''
    }
  }

  onOpen () {
    this.setState({ visible: true })
  }

  onClose () {
    this.setState({ visible: false })
  }

  onPressUpload () {
    this.props.onPressUpload && this.props.onPressUpload(this.state.fileName)
  }

  render () {
    return (
      <ModalBox
        style={styles.modalInputName}
        swipeToClose={false}
        position={'center'}
        backdropPressToClose={false}
        // backdrop={false}
        // startOpen={true}
        isOpen={this.state.visible}>
        <View style={styles.contentModalInput}>
          <KeyboardAvoidingView behavior='height'>
            <Text style={styles.txtHeaderModalInput}>Please input your file name to upload</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => this.setState({ fileName: text })}
              value={this.state.fileName}
              underlineColorAndroid='transparent'
              placeholder='Input your file name'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => this.onPressUpload()}>
                <Image source={require('../assets/icUploadNew.png')} style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ visible: false })}>
                <Image source={require('../assets/icCancelNew.png')} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ModalBox>

    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     account: state.accountReducer
//     // videoData: state.videoReducer
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ModalPicker)
