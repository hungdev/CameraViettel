import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
//Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import allReducers from '../reducers';
// import PinCodeScreen from './containers/PincodeScreen'
// import Camera from './CameraScreen'
// import Google from './GoogleSignin'
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import AppNavigation from '../navigation/AppNavigation'
import { REHYDRATE, PURGE, persistCombineReducers, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import { PersistGate } from 'redux-persist/es/integration/react';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
}

// let reducer = persistCombineReducers(config, allReducers)
const persistedReducer = persistReducer(persistConfig, allReducers)

let store = createStore(persistedReducer, undefined, compose(
  applyMiddleware(sagaMiddleware),
  // autoRehydrate()
));
let persistor = persistStore(store)
export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);