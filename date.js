/* eslint-disable prettier/prettier */
export const days = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];
export const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
export const monthsName = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const monthsRomawi = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
];

export function calculateDate(tanggal) {
  var d = new Date(tanggal);
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const fullDate = `${days[d.getDay()]}, ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;

  const accDate = `${days[d.getDay()]}, ${d.getDate()} ${
    monthsName[d.getMonth()]
  } ${d.getFullYear()}`;

  const waktu = `${d.getHours()}:${d.getMinutes()} WIB`;
  return {tanggal: accDate, waktu: waktu};
}
