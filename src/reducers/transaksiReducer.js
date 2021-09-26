/* eslint-disable prettier/prettier */
import {months, monthsName} from '../../date';
import {ADD_TRANSAKSI} from '../actions/userAction';
import {setData} from '../localStorage';

function calculateDate(tanggal) {
  var d = new Date(tanggal);
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const fullDate = `${days[d.getDay()]}, ${d.getDate()} ${
    monthsName[d.getMonth()]
  } ${d.getFullYear()}`;
  return fullDate;
}

function expiredDate(date) {
  var d = new Date(date);
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  d.setDate(d.getDate() + 7); // expired a week
  const expired = `${days[d.getDay()]}, ${d.getDate()} ${
    monthsName[d.getMonth()]
  } ${d.getFullYear()}`;
  return expired;
}
export default function transaksiReducer(state = {}, action) {
  switch (action.type) {
    case ADD_TRANSAKSI:
      const date = Date.now();
      const fullDate = calculateDate(date);

      const expired = expiredDate(date);
      if (action.payload.isRaw) {
        Object.keys(action.payload.transaksi).forEach((key) => {
          console.log(action.payload.transaksi[key]);
          if (action.payload.transaksi[key].expired == fullDate) {
            console.log(`Object ${key} is expired`);
            delete action.payload.transaksi[key];
          }
        });
        console.log('transaksi', action.payload.transaksi);
        setData('@transaksi', action.payload.transaksi);

        return action.payload.transaksi;
      } else {
        if (Object.keys(state).length === 0 && state.constructor === Object) {
          // OBJ Empty
          const data = {
            expired: expired,
            tanggal: action.payload.tanggal,
            receipt: [action.payload.transaksi],
            statusSetoran: action.payload.statusSetoran,
            totalTagihan: action.payload.totalTagihan,
            statusSync: false,
          };
          state[action.payload.tanggal] = data;
        } else {
          //OBJ Not Empty
          state = action.payload.allData;
          if (fullDate in state) {
            state[action.payload.tanggal].receipt.push(
              action.payload.transaksi,
            );
            state[action.payload.tanggal].totalTagihan +=
              action.payload.totalTagihan;
          } else {
            const data = {
              tanggal: action.payload.tanggal,
              receipt: [action.payload.transaksi],
              statusSetoran: action.payload.statusSetoran,
              totalTagihan: action.payload.totalTagihan,
            };
            state[action.payload.tanggal] = data;
          }
        }
      }
      return state;
    default:
      return state;
  }
}
