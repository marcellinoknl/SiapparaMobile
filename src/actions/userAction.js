/* eslint-disable prettier/prettier */
export const UPDATE_USER = 'users:updateUser';
export const UPDATE_LIST_KOMODITI = 'komoditi:updateListKomoditi';
export const ADD_KOMODITI = 'komoditi:addKomoditi';
export const ADD_RECEIPT = 'receipt:addReceipt';
export const BULAN_RECEIPT = 'receipt:bulanReceipt';
export const KALKULASI_SETORAN = 'home:kalkulasiSetoran';
export const ADD_SETORAN = 'setoran:addSetoran';
export const UPDATE_BIAYA_RETRIBUSI = 'biaya_retribusi:updateBiayaRetribusi';

export const ADD_TRANSAKSI = 'transaksi:addTransaksi';

export function updateUser(newUser) {
  return {
    type: UPDATE_USER,
    payload: {user: newUser},
  };
}

export function updateListKomoditi(komoditi) {
  return {
    type: UPDATE_LIST_KOMODITI,
    payload: {listKomoditi: komoditi},
  };
}

export function updateBiayaRetribusi(newBiayaRetribusi) {
  return {
    type: UPDATE_BIAYA_RETRIBUSI,
    payload: {listRetribusi: newBiayaRetribusi},
  };
}

export function addKomoditiTrans(newKomoditi, isApp) {
  return {
    type: ADD_KOMODITI,
    payload: {komoditi: newKomoditi, isNew: isApp},
  };
}

// export function addReceipt(newReceipt, isApp) {
//   return {
//     type: ADD_RECEIPT,
//     payload: {receipt: newReceipt, isNew: isApp},
//   };
// }

export function bulanReceipt(newBulan, id, isApp) {
  return {
    type: BULAN_RECEIPT,
    payload: {bulanReceipt: newBulan, id: id, isNew: isApp},
  };
}

// export function kalkulasiSetoran(newSetoran, isNew) {
//   return {
//     type: KALKULASI_SETORAN,
//     payload: {kalkulasi: newSetoran, isApp: isNew},
//   };
// }

export function addSetoran(newSetoran) {
  return {
    type: ADD_SETORAN,
    payload: {setoran: newSetoran},
  };
}

export function addTransaksi(
  newTransaksi,
  tanggal,
  statusSetoran,
  totalTagihan,
  allData,
  isRaw,
) {
  return {
    type: ADD_TRANSAKSI,
    payload: {
      transaksi: newTransaksi,
      tanggal: tanggal,
      statusSetoran: statusSetoran,
      totalTagihan: totalTagihan,
      allData: allData,
      isRaw: isRaw,
    },
  };
}
