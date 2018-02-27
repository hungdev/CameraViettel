// import React, { Component } from 'react';
// import { AppRegistry, AsyncStorage } from 'react-native';
// //Redux
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';

// import allReducers from '../reducers';
// import accountReducer from '../reducers';
// // import PinCodeScreen from './containers/PincodeScreen'
// // import Camera from './CameraScreen'
// // import Google from './GoogleSignin'
// //Redux saga
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from '../sagas/rootSaga';
// import AppNavigation from '../navigation/AppNavigation'
// import { REHYDRATE, PURGE, persistCombineReducers, persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // or whatever storage you are using
// import { PersistGate } from 'redux-persist/es/integration/react';
// import progressReducer from '../reducers/progressReducer';
// import videoReducers from '../reducers/videoReducer';

// const sagaMiddleware = createSagaMiddleware();
// // const persistConfig = {
// //   key: 'root',
// //   storage,
// //   // whitelist: [                    
// //   //   'accountReducer'
// //   // ],
// //   blacklist: [
// //     'progressReducer',
// //     'videoReducers',
// //     'accountReducer'
// //   ]
// // }

// // let reducer = persistCombineReducers(config, allReducers)
// const persistedReducer = persistReducer(persistConfig, allReducers)

// let store = createStore(persistedReducer, undefined, compose(
//   applyMiddleware(sagaMiddleware),
//   // autoRehydrate()
// ));
// let persistor = persistStore(store)
// export default class App extends Component<{}> {
//   render() {
//     return (
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <AppNavigation />
//         </PersistGate>
//       </Provider>
//     );
//   }
// }

// sagaMiddleware.run(rootSaga);


import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import allReducers from '../reducers';
// import PinCodeScreen from './containers/PincodeScreen'
import Camera from './CameraScreen'
import Google from './GoogleSignin'
import AppNavigation from '../navigation/AppNavigation'
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
        <AppNavigation />
    </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);