/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ListViewTagihan} from './Components/ListView';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {calculateDate} from '../../date';

class ListTagihan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: [],
      curDate: '',
      cariId: '',
      isLoading: true,
    };
  }

  reverseObj(obj, cDate) {
    if (this.props.transaksi.hasOwnProperty(cDate.tanggal)) {
      setTimeout(() => {
        let data = obj;
        console.log(data);
        this.setState({receipt: data, isLoading: false});
      }, 1000);
    } else {
      setTimeout(() => {
        this.setState({receipt: [], isLoading: false});
      }, 1000);
    }
  }

  componentDidMount() {
    console.log(this.props.transaksi);
    const date = Date.now();
    let d = new Date(date);
    const cDate = calculateDate(d);
    this.setState({
      curDate: cDate.tanggal,
      isLoading: true,
    });
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.setState({isLoading: true});
      if (this.props.transaksi.hasOwnProperty(cDate.tanggal)) {
        this.reverseObj(this.props.transaksi[cDate.tanggal].receipt, cDate);
      } else {
        this.setState({receipt: [], isLoading: false});
      }
    });

    if (this.props.transaksi.hasOwnProperty(cDate.tanggal)) {
      this.reverseObj(this.props.transaksi[cDate.tanggal].receipt, cDate);
    } else {
      setTimeout(() => {
        this.setState({receipt: [], isLoading: false});
      }, 1000);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.h1}>Daftar Receipt</Text>
            <Text style={styles.date}>{this.state.curDate}</Text>
          </View>

          <View>
            <Text style={{marginTop: 10}}>Cari ID Receipt</Text>
            <TextInput
              onChangeText={(val) => {
                this.setState({cariId: val});
                console.log(val);
              }}
              value={this.state.cariId}
              style={styles.cari}
              placeholder="ex: 0001/DSG/H/X/2020"
            />

            <View style={{marginTop: 10}}>
              {this.state.isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : Array.isArray(this.state.receipt) &&
                this.state.receipt.length ? (
                this.state.receipt.map((item) => {
                  if (item.id.includes(this.state.cariId)) {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          let pembayaran_id = '';
                          if (item.pembayaran == 'Harian') {
                            pembayaran_id = 'H';
                          } else if (item.pembayaran == 'Bulanan') {
                            pembayaran_id = 'B';
                          }

                          const data = {
                            fasilitas: item.fasilitas,
                            totalTagihan: item.totalTagihan,
                            jumlah: item.tanggal,
                            tanggal: item.tanggal,
                            pembayaran: item.pembayaran,
                            pembayaran_id: pembayaran_id,
                            id: item.id,
                            status: item.status,
                            waktu: item.waktu,
                            statusSync: item.statusSync,
                          };
                          console.log('data', item);
                          this.props.navigation.navigate('DetailReceipt', [
                            data,
                            {from: 'List'},
                          ]);
                        }}>
                        <ListViewTagihan
                          status={item.status}
                          id={item.id}
                          harga={item.totalTagihan}
                          waktu={item.waktu}
                          jenisPembayaran={item.pembayaran}
                        />
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <Text
                  style={{
                    fontFamily: 'sans-serif-bold',
                    marginTop: 30,
                    fontSize: 15,
                    textAlign: 'center',
                    color: 'gray',
                  }}>
                  Tidak ada data
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  h1: {
    fontSize: 35,
    fontFamily: 'sans-serif-medium',
    color: '#3D3D3D',
  },
  date: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#3D3D3D',
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#2f80ed',
  },
  cari: {
    borderWidth: 1,
    marginTop: 5,
    borderColor: '#adadad',
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  receipt: state.receipt,
  transaksi: state.transaksi,
});

export default connect(mapStateToProps)(ListTagihan);
