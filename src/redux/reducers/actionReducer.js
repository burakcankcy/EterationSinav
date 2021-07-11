import _ from 'lodash';
import {GET_SIMPSONS, SAVE_CHARACHTER} from '../actions/getAction';

const initialState = {
  simpsonsList: [],
};

const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIMPSONS:
      return {
        ...state,
        simpsonsList: action.simpsonsList,
      };
    case SAVE_CHARACHTER:
      return {
        ...state,
        simpsonsList: action.simpsonsList,
      };
    default:
      return state;
  }
};

export default actionReducer;
