/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Image,
} from 'react-native';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from 'react-native-bluetooth-escpos-printer';

import { setData, getData } from '../localStorage';
import { months, monthsName, monthsRomawi } from '../../date';
import {
  addReceipt,
  addTransaksi,
  bulanReceipt,
  kalkulasiSetoran,
} from '../actions/userAction';
import ImagePicker from 'react-native-image-picker';
import { currencySeparator } from '../../currency';

var { width } = Dimensions.get('window');

const base64JpgLogo =
  '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';

class DetailReceipt extends Component {
  _listeners = [];
  tanggal = this.props.route.params[0].tanggal;
  waktu = this.props.route.params[0].waktu;
  id = '';
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      boundAddress: '',
      debugMsg: '',

      receiptId: '',
      statusSetoran: false,

      avatarSource: null,
    };
  }

  handleCetak() {
    var d = Date.now();
    var date = new Date(d);
    const params = this.props.route.params[0];
    console.log(params);
    this.props.onAddTransaction(
      params,
      this.props.route.params[0].tanggal, // ====> change as this.props.route.params[0].tanggal
      false, //statusSetor
      this.props.route.params[0].totalTagihan, // ====> change to this.props.route.params[0].totalTagihan
      this.props.transaksi,
      false,
    );
    this.props.onChangeBulan(date.getMonth() + 1, params.id_receipt, false);
    setData('@transaksi', this.props.transaksi);
    setData('@bulanReceipt', this.props.bulanReceipt);
    // this.props.navigation.goBack();
  }

  batalReceipt = async (data) => {
    console.log('Select Image');
    ImagePicker.launchCamera(
      {
        noData: true,
        mediaType: 'photo',
        quality: 0.2,
        storageOptions: {
          skipBackup: true,
          path: 'ebilling/bukti-pembatalan-setoran',
        },
      },
      (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };
          this.setState({
            avatarSource: source,
          });
          let receipt = this.props.transaksi[this.tanggal].receipt;
          receipt.map((item) => {
            console.log(this.id);
            if (item.id == this.props.route.params[0].id) {
              console.log(item);
              item.status = 'waiting';
              item.buktiBatal = response;
              this.props.transaksi[this.tanggal].totalTagihan -=
                item.totalTagihan;

              ToastAndroid.show(`Receipt Dibatalkan`, ToastAndroid.SHORT);
              this.props.onCancelTransaksi(
                this.props.transaksi,
                null,
                null,
                null,
                null,
                true,
              );
              setData('@transaksi', this.props.transaksi);
              this.props.navigation.goBack();
            }
          });
        }
      },
    );
  };

  componentDidMount() {
    // this.calculateDate(this.props.route.params[0].rawDate);
    console.log('params', this.props.route.params[0]);
    // this.tanggal = this.props.route.params[0].tanggal;
    // this.waktu = this.props.route.params[0].waktu;
    // this.setState({setoran: this.props.transaksi[this.props.route.params[0].tanggal].statusSetoran});

    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        this.setState({
          bleOpend: Boolean(enabled),
          loading: false,
        });
      },
      (err) => {
        err;
      },
      getData('printer')
        .then((res) => {
          if (res !== null) {
            console.log(res);
            const userData = JSON.parse(res);
            console.log(userData.boundAddress);
            BluetoothManager.connect(userData.boundAddress).then(
              (s) => {
                this.setState({
                  loading: false,
                  boundAddress: userData.boundAddress,
                  name: userData.name || 'UNKNOWN',
                });
              },
              (e) => {
                this.setState({
                  loading: false,
                });
                alert(e);
              },
            );
          } else {
            // store.dispatch(updateUser(''));
          }
        })
        .catch((e) => {
          console.log(e);
        }),
    );
    if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          (rsp) => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          (rsp) => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  componentWillUnmount() {
    //for (let ls in this._listeners) {
    //    this._listeners[ls].remove();
    //}
  }

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) { }
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            style={styles.wtf}
            onPress={() => {
              this.setState({
                loading: true,
              });
              setData('printer', {
                boundAddress: row.address,
                name: row.name || 'UNKNOWN',
              });
              BluetoothManager.connect(row.address).then(
                (s) => {
                  this.setState({
                    loading: false,
                    boundAddress: row.address,
                    name: row.name || 'UNKNOWN',
                  });
                },
                (e) => {
                  this.setState({
                    loading: false,
                  });
                  alert(e);
                },
              );
            }}>
            <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
            <Text style={styles.address}>{row.address}</Text>
          </TouchableOpacity>,
        );
      }
    }
    return items;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.route.params[1].from == 'List' ? (
          <View></View>
        ) : this.props.route.params[0].status == 'new' &&
          this.props.route.params[0].statusSync === false ? (
          <View>
            <Text style={styles.title}>
              Status Bluetooth: {this.state.bleOpend ? 'Menyala' : 'Mati'}{' '}
            </Text>
            <View>
              <Switch
                value={this.state.bleOpend}
                onValueChange={(v) => {
                  this.setState({
                    loading: true,
                  });
                  if (!v) {
                    BluetoothManager.disableBluetooth().then(
                      () => {
                        this.setState({
                          bleOpend: false,
                          loading: false,
                          foundDs: [],
                          pairedDs: [],
                        });
                      },
                      (err) => {
                        alert(err);
                      },
                    );
                  } else {
                    BluetoothManager.enableBluetooth().then(
                      (r) => {
                        var paired = [];
                        if (r && r.length > 0) {
                          for (var i = 0; i < r.length; i++) {
                            try {
                              paired.push(JSON.parse(r[i]));
                            } catch (e) {
                              //ignore
                            }
                          }
                        }
                        this.setState({
                          bleOpend: true,
                          loading: false,
                          pairedDs: paired,
                        });
                      },
                      (err) => {
                        this.setState({
                          loading: false,
                        });
                        alert(err);
                      },
                    );
                  }
                }}
              />
              {/* <Button
            disabled={this.state.loading || !this.state.bleOpend}
            onPress={() => {
              this._scan();
            }}
            title="Scan"
          /> */}
            </View>
            <Text style={styles.title}>
              Printer terkoneksi:
              <Text style={!this.state.name ? { color: 'red' } : { color: 'blue' }}>
                {!this.state.name ? 'Tidak Ada' : this.state.name}
              </Text>
            </Text>
            {/* <Text style={styles.title}>Found(tap to connect):</Text>
        {this.state.loading ? <ActivityIndicator animating={true} /> : null}
        <View style={{flex: 1, flexDirection: 'column'}}>
          {this._renderRow(this.state.foundDs)}
        </View> */}
            <Text style={styles.title}>Pilih Printer:</Text>
            {this.state.loading ? <ActivityIndicator animating={true} /> : null}
            <View style={{ flex: 1, flexDirection: 'column' }}>
              {this._renderRow(this.state.pairedDs)}
            </View>
          </View>
        ) : this.props.route.params[0].statusSync === false &&
          this.props.route.params[0].status == 'waiting' ? (
          <View>
            <Text style={{ color: 'red' }}>Receipt telah dibatalkan </Text>
          </View>
        ) : (
          <View />
        )}
        {/* Table */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flex: 2 }}>
              <Text style={styles.header}>
                DINAS KOPERASI, PERDAGANGAN DAN PERINDUSTRIAN
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width / 5,
                  height: 70,
                  alignSelf: 'flex-end',
                }}
                source={require('../../assets/images/Logo.png')}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }}>
              <Text>Nomor</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.route.params[0].id}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Hari, tanggal</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.route.params[0].tanggal}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Pukul</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.route.params[0].waktu}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Tipe pasar</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.user.tipePasar}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Pembayaran</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.route.params[0].pembayaran}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Fasilitas</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.route.params[0].fasilitas}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Jumlah</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>{this.props.route.params[0].jumlah}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 4 }}>
              <Text>Retribusi</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>
                Rp {currencySeparator(this.props.route.params[0].totalTagihan)}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Petugas Pasar {this.props.user.kecamatan}</Text>
            <Text>dto</Text>
            <Text>{this.props.user.nama}</Text>
          </View>
        </View>

        {this.props.route.params[0].status == 'new' &&
          this.props.route.params[0].statusSync === false ? (
          <View>
            {this.props.route.params[1].from == 'form' ? (
              <Button
                // disabled={
                //   this.state.loading || this.state.boundAddress.length <= 0
                // }
                title="CETAK"
                onPress={async () => {
                  try {
                    await BluetoothEscposPrinter.printerInit();
                    await BluetoothEscposPrinter.printerLeftSpace(0);
                    await BluetoothEscposPrinter.printerAlign(
                      BluetoothEscposPrinter.ALIGN.LEFT,
                    );
                    await BluetoothEscposPrinter.printPic(base64JpgLogo, {
                      width: 360,
                      left: 30,
                    });
                    await BluetoothEscposPrinter.printerAlign(
                      BluetoothEscposPrinter.ALIGN.LEFT,
                    );
                    await BluetoothEscposPrinter.printText(
                      '--------------------------------\r\n',
                      {},
                    );
                    let columnWidths = [16, 24];
                    let printerFont = {
                      encoding: 'GBK',
                      codepage: 0,
                      widthtimes: 0,
                      heigthtimes: 0,
                      fonttype: 1,
                    };
                    let printerAlign = [
                      BluetoothEscposPrinter.ALIGN.LEFT,
                      BluetoothEscposPrinter.ALIGN.LEFT,
                    ];
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      ['Nomor', `: ${this.props.route.params[0].id}`],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      [
                        'Hari, tanggal',
                        `: ${this.props.route.params[0].tanggal}`,
                      ],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      ['Pukul', `: ${this.props.route.params[0].waktu}`],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      ['Tipe Pasar', `: ${this.props.user.tipePasar}`],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      [
                        'Pembayaran',
                        `: ${this.props.route.params[0].pembayaran}`,
                      ],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      [
                        'Fasilitas',
                        `: ${this.props.route.params[0].jenisTempat}`,
                      ],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      ['Jumlah', `: ${this.props.route.params[0].jumlah}`],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printColumn(
                      columnWidths,
                      printerAlign,
                      [
                        'Retribusi',
                        `: Rp ${this.props.route.params[0].totalTagihan}`,
                      ],
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printText('\n\n', {});
                    await BluetoothEscposPrinter.printText(
                      `Petugas pasar ${this.props.user.kecamatan}\n`,
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printText(
                      'dto\n',
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printText(
                      `${this.props.user.nama}`,
                      printerFont,
                    );
                    await BluetoothEscposPrinter.printText('\r\n\r\n', {});

                    this.handleCetak();
                    this.props.navigation.goBack();
                  } catch (e) {
                    alert(e.message || 'ERROR');
                  }
                }}
              />
            ) : (
              <View></View>
            )}

            <View style={{ marginTop: 10 }} />
            <Button
              title="Batal"
              color="#EB5757"
              onPress={() => {
                if (this.props.route.params[1].from == 'form') {
                  this.props.navigation.goBack();
                } else {
                  this.batalReceipt(this.props.route.params[0]);
                }
              }}
            />
            <View style={{ marginBottom: 10 }} />
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }

  _selfTest() {
    this.setState(
      {
        loading: true,
      },
      () => {
        BluetoothEscposPrinter.selfTest(() => { });

        this.setState({
          loading: false,
        });
      },
    );
  }

  _scan() {
    this.setState({
      loading: true,
    });
    BluetoothManager.scanDevices().then(
      (s) => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false,
        });
      },
      (er) => {
        this.setState({
          loading: false,
        });
        alert('error' + JSON.stringify(er));
      },
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },

  title: {
    width: width,
    backgroundColor: '#eee',
    color: '#232323',
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: 'left',
  },
  wtf: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
  },
  name: {
    flex: 1,
    textAlign: 'left',
  },
  address: {
    flex: 1,
    textAlign: 'right',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ADADAD',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    height: 45,
    marginTop: 20,
    borderColor: '#adadad',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB5757',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  receipt: state.receipt,
  kalkulasiSetoran: state.kalkulasiSetoran,
  transaksi: state.transaksi,
  bulanReceipt: state.bulanReceipt,
});

const mapActionsToProps = {
  onAddReceipt: addReceipt,
  addKalkulasi: kalkulasiSetoran,
  onCancelTransaksi: addTransaksi,
  onAddTransaction: addTransaksi,
  onChangeBulan: bulanReceipt,
};

export default connect(mapStateToProps, mapActionsToProps)(DetailReceipt);
