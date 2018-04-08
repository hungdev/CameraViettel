import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Styles
import styles from './styles/ModalPickerStyle'
// import { Images, Colors } from '../Themes/index'
import ModalBox from 'react-native-modalbox'
import MediaPicker from './MediaPicker'

export default class ModalPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  onOpen () {
    this.setState({ visible: true })
  }

  onClose () {
    this.setState({ visible: false })
  }

  render () {
    return (
      <ModalBox
        style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
        swipeToClose={false}
        position={'center'}
        isOpen={this.state.visible}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <MediaPicker
            numPhotos={20}
            numVideos={20}
            onCancel={() => this.setState({visible: false})}
            onSelectedItem={(item) => this.props.onSelectedItem(item)}
          />
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
