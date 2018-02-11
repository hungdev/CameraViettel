
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import allReducers from '../reducers';
// import PinCodeScreen from './containers/PincodeScreen'
import Camera from './CameraScreen'
import Google from './GoogleSignin'
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga'; 

const sagaMiddleware = createSagaMiddleware();

let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        {/* <Google /> */}
        <Camera />
    </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);