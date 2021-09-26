/* eslint-disable prettier/prettier */
import listKomoditiReducer from './listKomoditiReducers';
import userReducer from './userReducers';
import komoditiReducer from './komoditiReducer';
import receiptReducer from './receiptReducer';
import bulanReceiptReducer from './bulanReceipt';
import kalkulasiSetoranReducer from './kalkulasiSetoran';
import setoranReducer from './setoranReducer';
import transaksiReducer from './transaksiReducer';
import biayaRetribusiReducer from './biayaRetribusiReducer';

const allReducer = {
  user: userReducer,
  listKomoditi: listKomoditiReducer,
  addKomoditi: komoditiReducer,
  // receipt: receiptReducer,
  bulanReceipt: bulanReceiptReducer,
  // kalkulasiSetoran: kalkulasiSetoranReducer,
  // setoran: setoranReducer,
  transaksi: transaksiReducer,
  biayaRetribusi: biayaRetribusiReducer,
};

export default allReducer;
