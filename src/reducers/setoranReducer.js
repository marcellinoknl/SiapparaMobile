/* eslint-disable prettier/prettier */
import {ADD_SETORAN} from '../actions/userAction';

export default function setoranReducer(state = {}, action) {
  switch (action.type) {
    case ADD_SETORAN:
      console.log(action.payload);
      break;
    //   return action.payload.newSetoran;
    default:
      return state;
  }
}
