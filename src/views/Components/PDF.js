/* eslint-disable prettier/prettier */
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {PermissionsAndroid, Platform} from 'react-native';

export const askPermission = () => {
  async function requestExternalWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        createPDF();
      } else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      alert('Write permission err', err);
      console.warn(err);
    }
  }
  //Calling the External Write permission function
  if (Platform.OS === 'android') {
    requestExternalWritePermission();
  } else {
    this.createPDF();
  }
};

export const createPDF = async () => {
  let options = {
    html: `<p>Dinas Kopendagin</p>
      <p>Kab.Humbang Hasundutan</p>
      <p>Nomor:</p><br>
      <table>
        <tr>
            <td>Hari, Tanggal</td>
            <td>:</td>
            <td>Sabtu, 29-8-2020</td>
        </tr>
        <tr>
            <td>Pukul</td>
            <td>:</td>
            <td>10:34:12</td>
        </tr>
        <tr>
            <td>Type</td>
            <td>:</td>
            <td>I</td>
        </tr>
        <tr>
            <td>Pembayaran</td>
            <td>:</td>
            <td>Harian</td>
        </tr>
        <tr>
            <td>Fasilitas</td>
            <td>:</td>
            <td>Dasaran</td>
        </tr>
        <tr>
            <td>Ukuran</td>
            <td>:</td>
            <td>2 x 2 m</td>
        </tr>
        <tr>
            <td>Retribusi</td>
            <td>:</td>
            <td>3000</td>
        </tr>
      </table>
      <br>
      <p>Petugas pasar</p>
      <p>Tony Stark</p>`,
    fileName: 'test',
    directory: 'eBilling/harian',
    height: 360,
    width: 350,
  };
  let file = await RNHTMLtoPDF.convert(options);
  await RNPrint.print({filePath: file.filePath});
};
