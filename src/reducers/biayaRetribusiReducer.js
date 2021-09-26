/* eslint-disable prettier/prettier */
import {UPDATE_BIAYA_RETRIBUSI} from '../actions/userAction';

export default function biayaRetribusiReducer(state = '', action) {
  switch (action.type) {
    case UPDATE_BIAYA_RETRIBUSI:
      return action.payload.listRetribusi;
    default:
      return state;
  }
}
