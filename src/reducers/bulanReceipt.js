/* eslint-disable prettier/prettier */
import {BULAN_RECEIPT} from '../actions/userAction';

export default function bulanReceiptReducer(
  state = {bulan: '', id: ''},
  action,
) {
  switch (action.type) {
    case BULAN_RECEIPT:
      const date = Date.now();
      const d = new Date(date);
      const curMonth = d.getMonth() + 1;
      if (action.payload.isNew) {
        console.log('bulanReceipt', action.payload.bulanReceipt.bulan);
        if (curMonth == action.payload.bulanReceipt.bulan) {
          return action.payload.bulanReceipt;
        } else if (curMonth != action.payload.bulanReceipt.bulan) {
          state.bulan = curMonth;
          state.id = 0;
          console.log(state);
          return state;
        }
      }
      state.bulan = action.payload.bulanReceipt;
      state.id = action.payload.id;
      return state;
    default:
      return state;
  }
}
