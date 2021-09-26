/* eslint-disable prettier/prettier */
import {KALKULASI_SETORAN} from '../actions/userAction';

export default function kalkulasiSetoranReducer(
  state = {kalkulasi: 0},
  action,
) {
  switch (action.type) {
    case KALKULASI_SETORAN:
      if (action.payload.isApp) {
        state.kalkulasi = action.payload.kalkulasi;
        return state;
      }
      state.kalkulasi = state.kalkulasi + action.payload.kalkulasi;
      return state;
    default:
      return state;
  }
}
