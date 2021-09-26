/* eslint-disable prettier/prettier */
import {ADD_KOMODITI} from '../actions/userAction';

export default function komoditiReducer(state = {}, action) {
  switch (action.type) {
    case ADD_KOMODITI:
      console.log('komoditi', action.payload.komoditi.statusSync);
      if (action.payload.komoditi.statusSync) {
        const now = Date.now();
        const d = new Date(now);
        const past = new Date(action.payload.komoditi.rawDate);
        if (d.getDate() === past.getDate()) {
          console.log('sama');
        } else {
          return state;
        }
      }

      if (action.payload.isNew) {
        return action.payload.komoditi;
      } else if (!action.payload.isNew) {
        let lastKey = 0;
        for (const [key] of Object.entries(state)) {
          if (lastKey > key) {
            lastKey++;
          } else if (lastKey == key) {
            lastKey++;
          }
        }
        state[lastKey] = action.payload.komoditi;
        return state;
      }
    default:
      return state;
  }
}
