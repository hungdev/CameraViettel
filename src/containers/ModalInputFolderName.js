import React, { Component } from 'react'
import ReactNative, { ScrollView, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './styles/ModalInputFolderNameStyle'
// import { Images, Colors } from '../Themes/index'
import ModalBox from 'react-native-modalbox'
import Hr from '../components/Hr'
import Reactotron from 'reactotron-react-native'

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

  onCreate () {
    const { carName, yourName, provinceName, phoneNumber } = this.state
    if (!carName || !yourName || !provinceName || !phoneNumber) {
      alert('Bạn cần nhập đủ các trường!')
    } else {
      // this.setState({visible: false})
      let string = ''
      let folderName = string.concat(carName, '_', yourName, '_', provinceName, '_', phoneNumber)
      this.props.onCreate && this.props.onCreate(folderName)
      this.setState({ carName: '', yourName: '', provinceName: '', phoneNumber: '' })
    }
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
        <KeyboardAvoidingView behavior='padding'>
          <View style={styles.contentModalInput}>
            <Text style={styles.txtHeaderModalInput}>Nhập thông tin về folder</Text>
            <Hr lineHeight={0.5} lineColor='#B8B8B8' marginLeft={10} marginRight={10} marginTop={0} marginBottom={0} />
            <View style={styles.rowInput}>
              <Text style={styles.txtLabel}>Tên xe</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({ carName: text })}
                value={this.state.carName}
                underlineColorAndroid='transparent'
                placeholder='Nhập tên xe'
              />
            </View>
            <View style={styles.rowInput}>
              <Text style={styles.txtLabel}>Họ tên</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({ yourName: text })}
                value={this.state.yourName}
                underlineColorAndroid='transparent'
                placeholder='Nhập họ tên'
              />
            </View>
            <View style={styles.rowInput}>
              <Text style={styles.txtLabel}>Tỉnh</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({ provinceName: text })}
                value={this.state.provinceName}
                underlineColorAndroid='transparent'
                placeholder='Nhập tên tỉnh'
              />
            </View>
            <View style={styles.rowInput}>
              <Text style={styles.txtLabel}>Số điện thoại</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                value={this.state.phoneNumber}
                underlineColorAndroid='transparent'
                placeholder='Nhập số điện thoại'
              />
            </View>
            <View style={styles.rowButton}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.setState({ visible: false, carName: '', yourName: '', provinceName: '', phoneNumber: '' })}>
                <Text style={styles.txtButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onCreate()}>
                <Text style={styles.txtButton}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ModalBox>

    )
  }
}
