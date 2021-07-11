import {combineReducers} from 'redux';
import actionReducer from './actionReducer';

export default combineReducers({
  simpsons: actionReducer,
});
