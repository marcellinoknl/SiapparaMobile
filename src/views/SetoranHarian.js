/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

import LinearButton from './Components/LinearButton';
import { Picker } from '@react-native-community/picker';
import { askPermission } from './Components/PDF';
import { getData, setData } from '../localStorage';
import { connect } from 'react-redux';
import {
  addReceipt,
  addTransaksi,
  bulanReceipt,
  kalkulasiSetoran,
} from '../actions/userAction';
import { months, monthsName, monthsRomawi } from '../../date';
import { currencySeparator } from '../../currency';
import CurrencyInput from './Components/CurrencyInputSetoranHarian'

class SetoranHarian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenisTempat: '',
      jumlah: 1,
      tagihan: 0,
      totalTagihan: 0,
      id: null,
      id_fasilitas: null,
      receiptId: '',
      pckerData: [],
    };
  }

  handleJenisTempat(itemValue) {
    if (itemValue == -1) return;
    let tagihanData = this.state.pckerData.filter((item) => {
      return item.id == itemValue;
    });

    console.log(tagihanData[0].jenis_dan_ukuran);
    let totalTagihan = tagihanData[0].harga * this.state.jumlah;
    this.setState({
      id_fasilitas: itemValue,
      jenisTempat: tagihanData[0].jenis_dan_ukuran,
      tagihan: tagihanData[0].harga,
      totalTagihan: totalTagihan,
    });
  }

  handleJumlah = val => {
    if (val == null) {
      this.setState({ totalTagihan: 0 });
      return;
    }
    val = parseInt(val);
    if (val < 0) {
      this.setState({ totalTagihan: 0 });
    } else {
      let tagihan;
      console.log(this.state.tagihan);
      this.setState({ jumlah: val });
      if (this.state.jenisTempat !== '') {
        if (val === '') {
          this.state.totalTagihan = 0;
        } else if (val >= 1) {
          tagihan = this.state.tagihan * val;
          console.log('tagihan', tagihan);
        }
        this.setState({ totalTagihan: tagihan });
      }
    }
  }

  componentDidMount() {
    let biaya_harian = this.props.biayaRetribusi.biaya_retribusi.filter(
      (item) => {
        return item.jenis_pembayaran == 'Harian';
      },
    );
    this.setState({ pckerData: biaya_harian });
  }

  handleId(data) {
    const user = this.props.user;
    var date = new Date(data.tanggal);

    var str = '' + data.id;
    var pad = '0000';
    var ans = pad.substring(0, pad.length - str.length) + str;

    const id = `${ans}/${user.kecSingkatan}/${data.pembayaran_id}/${monthsRomawi[date.getMonth()]
      }/${date.getFullYear()}`;
    this.setState({ receiptId: id });
    return id;
  }

  calculateDate(tanggal) {
    var d = new Date(tanggal);
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const fullDate = `${days[d.getDay()]}, ${d.getDate()} ${monthsName[d.getMonth()]
      } ${d.getFullYear()}`;
    const waktu = `${d.getHours()}:${d.getMinutes()} WIB`;
    return { tanggal: fullDate, waktu: waktu };
  }

  addReceipt(data) {
    const ids = this.handleId(data);
    const datetime = this.calculateDate(data.tanggal);
    const user = this.props.user;

    const dataToSaved = {
      id_receipt: data.id,
      id_fasilitas: this.state.id_fasilitas,
      id: ids,
      tanggal: datetime.tanggal,
      waktu: datetime.waktu,
      tipePasar: user.tipePasar,
      pembayaran: data.pembayaran,
      pembayaran_id: data.pembayaran_id,
      fasilitas: data.jenisTempat,
      jumlah: data.jumlah,
      totalTagihan: data.totalTagihan,
      petugas: user.nama,
      rawDate: data.tanggal,
      buktiBatal: '',
      status: data.status,
      statusSync: false,
    };

    console.log('dataToSaved', dataToSaved);
    this.props.navigation.navigate('DetailReceipt', [
      dataToSaved,
      { from: 'form' },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Jenis Tempat</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.id_fasilitas}
              style={{ color: 'black' }}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                this.handleJenisTempat(itemValue)
              }>
              <Picker.Item label="Pilih Jenis Tempat" key={-1} value={-1} />
              {this.state.pckerData.map((item) => {
                return (
                  <Picker.Item
                    key={item.id}
                    label={item.jenis_dan_ukuran}
                    value={item.id}
                  />
                );
              })}
            </Picker>
          </View>
          <Text style={[styles.label, { marginTop: 10 }]}>Jumlah</Text>
          <CurrencyInput calculateSallary={this.handleJumlah} />

          <Text style={[styles.label, { marginTop: 10 }]}>Biaya ditagihan</Text>
          <Text style={[styles.total, { marginTop: 10 }]}>
            Rp {currencySeparator(this.state.totalTagihan)}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.linearGradient}
            onPress={() => {
              if (
                this.state.jenisTempat !== '' &&
                this.state.jumlah != 0 &&
                this.state.totalTagihan != 0
              ) {
                var addId;
                if (this.props.bulanReceipt.bulan == '') {
                  addId = 1;
                } else if (this.props.bulanReceipt.bulan != '') {
                  addId = this.props.bulanReceipt.id;
                  addId += 1;
                }

                const data = {
                  jenisTempat: this.state.jenisTempat,
                  totalTagihan: this.state.totalTagihan,
                  jumlah: this.state.jumlah,
                  tanggal: Date.now(),
                  pembayaran: 'Harian',
                  pembayaran_id: 'H',
                  id: addId,
                  buktiBatal: '',
                  status: 'new',
                };

                this.addReceipt(data);
              } else {
                alert('Mohon masukkan data yang benar');
              }
            }}>
            <LinearButton text="Buat Receipt" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  input: {
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 5,
    paddingLeft: 10,
  },
  total: {
    fontSize: 36,
    fontFamily: 'sans-serif-medium',
  },
  linearGradient: {
    height: 45,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  // receipt: state.receipt,
  bulanReceipt: state.bulanReceipt,
  user: state.user,
  transaksi: state.transaksi,
  biayaRetribusi: state.biayaRetribusi,
});

export default connect(mapStateToProps)(SetoranHarian);
