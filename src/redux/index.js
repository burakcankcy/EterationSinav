import ReduxThunk from 'redux-thunk';
import _ from 'lodash';

import rootReducer from './reducers/rootReducer';
import getStoredState from 'redux-persist/es/getStoredState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {applyMiddleware, createStore} from 'redux';
import persistStore from 'redux-persist/es/persistStore';

const migrate = async state => {
  if (_.isEmpty(state)) {
    try {
      const asyncState = await getStoredState({
        key: 'simpsons',
        transforms: [],
        storage: AsyncStorage,
      });
      if (!_.isEmpty(asyncState)) {
        return asyncState;
      }
    } catch (ex) {
      // console.warn(ex);
    }
  }
  return state;
};

const persistConfig = {
  key: 'simpsons',
  storage: AsyncStorage,
  whitelist: ['simpsons'],
  blacklist: [],
  migrate,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);
export {store, persistor};
