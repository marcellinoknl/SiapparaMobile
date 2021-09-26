/* eslint-disable prettier/prettier */
import Axios from 'axios';
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  // ProgressBarAndroid,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { base_url, local_base_url } from '../../config';
import {
  addKomoditiTrans,
  addReceipt,
  addTransaksi,
} from '../actions/userAction';
import { setData } from '../localStorage';
import { styles } from './Home';
import { ProgressBar } from '@react-native-community/progress-bar-android';

class AlertSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      progress: 0,
      date: '',
    };
  }
  date = '';

  handleRawDate(date) {
    const d = new Date(date);

    var str = '' + (d.getMonth() + 1);
    var pad = '00';
    var ans = pad.substring(0, pad.length - str.length) + str;
    this.date = `${d.getFullYear()}-${ans}-${d.getDate()}`;
    return this.date;
  }

  componentDidMount() {
    console.log(this.props);
  }

  showError() {
    this.setState({ isProcessing: false });
    ToastAndroid.show(
      `Error Server, silahkan tunggu beberapa saat atau silahkan hubungi Admin`,
      ToastAndroid.LONG,
    );
  }

  handleKomoditi() {
    this.setState({ isProcessing: true });
    const length = Object.keys(this.props.komoditi).length;
    let len = this.state.progress;
    if (length) {
      Object.keys(this.props.komoditi).forEach(async (key) => {
        const date = this.handleRawDate(this.props.komoditi[key].rawDate);
        const data = {
          komoditi: this.props.komoditi[key].id,
          harga: this.props.komoditi[key].harga,
          pasar: this.props.user.pasar_id,
          tanggal: date,
        };
        console.log(data);
        await Axios.post(`${base_url}/add-komoditi`, data).then((res) => {
          console.log(res);
          len++;
          this.setState({ progress: len / length });
          if (len === length) {
            ToastAndroid.show('Sync Komoditi Sukses', ToastAndroid.LONG);
            const success = { statusSync: true, rawDate: Date.now() };
            this.props.onKomoditiSync(success, true);
            console.log(this.props.komoditi);
            setData('@tambahKomoditi', this.props.komoditi);
            this.props.navigation.goBack();
          }
        })
          .catch((err) => {
            console.log(err);
            this.showError();
          });
      });
    } else {
      ToastAndroid.show(
        `Tidak terdapat data yang akan di sinkronkan`,
        ToastAndroid.LONG,
      );
      this.props.navigation.goBack();
    }
  }

  getLength(obj) {
    let length = 0;
    // var newObj = {};
    Object.keys(obj).forEach(async (key, index, collection) => {
      if (this.props.transaksi[key].statusSync == true) {
        // do nothing
      } else {
        length++;
      }
    });
    return length;
  }

  handleReceipt() {
    const objLength = this.getLength(this.props.transaksi);
    let success = 0;
    if (objLength) {
      Object.keys(this.props.transaksi).forEach(async (key, index) => {
        this.setState({ isProcessing: true, progress: 0, date: key });
        let transaksi = this.props.transaksi[key].receipt;
        console.log(this.props.transaksi[key].statusSync);

        if (!this.props.transaksi[key].statusSync) {
          console.log('sync...', objLength);
          let length = transaksi.length;
          let len = 0;

          await transaksi.forEach(async (item, idx) => {
            const date = this.handleRawDate(item.rawDate);
            let id = item.id.split('/');
            const data = {
              no_receipt: item.id,
              tanggal: date,
              waktu: item.waktu,
              tipe_pasar: item.tipePasar,
              jenis_pembayaran: item.pembayaran,
              fasilitas: item.fasilitas,
              jumlah: item.totalTagihan,
              petugas: this.props.user.nama,
              pasar: this.props.user.kecamatan,
            };
            var dataToSend = new FormData();
            dataToSend.append('no_receipt', item.id);
            dataToSend.append('pasar', this.props.user.pasar_id);
            dataToSend.append('biaya_retribusi', item.id_fasilitas);
            dataToSend.append('petugas', this.props.user.id_user);
            dataToSend.append('jumlah', item.jumlah);
            dataToSend.append('tanggal', date);
            dataToSend.append('id_receipt', id[0]);
            if (item.buktiBatal == '') {
              dataToSend.append('status', 1);
            } else {
              dataToSend.append('status', 2);
              dataToSend.append('bukti_batal', {
                uri: item.buktiBatal.uri,
                name: item.buktiBatal.fileName,
                type: item.buktiBatal.type,
              });
            }
            console.log(this.props.transaksi[key]);
            await Axios.post(`${base_url}/add-receipt`, dataToSend)
              .then((res) => {
                len++;
                this.setState({ progress: len / length });
                item.statusSync = true;
                if (len == length) {
                  success++;
                  this.props.transaksi[key].statusSync = true;
                  Axios.post(`${base_url}/penyetoran`, {
                    petugas: this.props.user.id_user,
                    jumlah_setoran: this.props.transaksi[key].totalTagihan,
                    tanggal_penyetoran: date,
                    pasar: this.props.user.pasar_id,
                  });
                  if (success == objLength) {
                    this.setState({ isProcessing: false });
                    ToastAndroid.show(`Sync Receipt Sukses`, ToastAndroid.LONG);
                    setData('@transaksi', this.props.transaksi);
                    this.props.navigation.goBack();
                  }
                }
              })
              .catch((err) => {
                this.showError();
              });
          });
        } else {
          console.log('data telah selesai');
          this.props.navigation.goBack();
        }
      });
    } else {
      ToastAndroid.show(
        `Tidak terdapat data yang akan di sinkronkan`,
        ToastAndroid.LONG,
      );
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.city}>Sync {this.props.route.params.tipe}</Text>
        <View style={internalStyles.message}>
          {this.state.isProcessing ? (
            <View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text>Sedang Memproses: </Text>
                <ActivityIndicator
                  style={{ marginLeft: 10 }}
                  size="small"
                  color="#0000ff"
                />
              </View>

              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.state.progress}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.person}>
                Data yang disinkronisasi tidak dapat diubah.
              </Text>
              <Text style={styles.person}>
                Anda yakin tetap melanjutkan sinkronisasi?
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          disabled={this.state.isProcessing}
          style={[
            internalStyles.button,
            this.state.isProcessing
              ? { backgroundColor: 'lightgray' }
              : { backgroundColor: '#00A4FF' },
          ]}
          onPress={() => {
            return Alert.alert(
              'Konfirmasi',
              'Apakah anda yakin untuk melakukan sinkronisasi?',
              [
                {
                  text: 'Tidak',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Ya',
                  onPress: () => {
                    if (this.props.route.params.tipe == 'Komoditi') {
                      this.handleKomoditi();
                    } else if (this.props.route.params.tipe == 'Receipt') {
                      this.handleReceipt();
                    }
                  },
                },
              ],
              { cancelable: false },
            );
          }}>
          <Text style={styles.text}>LANJUTKAN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.state.isProcessing}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={[
            internalStyles.button,
            this.state.isProcessing
              ? { backgroundColor: 'lightgray' }
              : { backgroundColor: '#EB5757' },
          ]}>
          <Text style={styles.text}>BATAL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const internalStyles = StyleSheet.create({
  message: {
    borderWidth: 1,
    borderColor: '#adadad',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => ({
  komoditi: state.addKomoditi,
  receipt: state.receipt,
  user: state.user,
  transaksi: state.transaksi,
});

const mapActionToProps = {
  onTransaksiSync: addTransaksi,
  onKomoditiSync: addKomoditiTrans,
};

export default connect(mapStateToProps, mapActionToProps)(AlertSync);
