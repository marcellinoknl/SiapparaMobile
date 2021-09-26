/* eslint-disable prettier/prettier */
import {ADD_RECEIPT} from '../actions/userAction';

export default function receiptReducer(state = {}, action) {
  switch (action.type) {
    case ADD_RECEIPT:
      if (action.payload.isNew) {
        return action.payload.receipt;
      } else if (!action.payload.isNew) {
        let lastKey = 0;
        for (const [key, value] of Object.entries(state)) {
          if (lastKey > key) {
            lastKey++;
          } else if (lastKey == key) {
            lastKey++;
          }
        }
        state[lastKey] = action.payload.receipt;
        return state;
      }
    default:
      return state;
  }
}
