/* eslint-disable prettier/prettier */
import {UPDATE_USER} from '../actions/userAction';

export default function userReducer(state = 'default', action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload.user;
    default:
      return state;
  }
}
