/* eslint-disable prettier/prettier */
import {UPDATE_LIST_KOMODITI} from '../actions/userAction';

export default function listKomoditiReducer(state = '', action) {
  switch (action.type) {
    case UPDATE_LIST_KOMODITI:
      return action.payload.listKomoditi;
    default:
      return state;
  }
}
