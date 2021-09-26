/* eslint-disable prettier/prettier */
export function currencySeparator(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return 0;
}
