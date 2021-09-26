/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart'; // Import package from node modules

import { useSelector } from 'react-redux';
import { removeData } from '../localStorage';
import { calculateDate } from '../../date';
import { currencySeparator } from '../../currency';

const Home = ({ navigation, route }) => {
  const user = useSelector((state) => state.user);
  const transaksi = useSelector((state) => state.transaksi);
  const komoditi = useSelector((state) => state.addKomoditi);

  const [tagihan, setTagihan] = useState(0);
  const [IsReceiptSync, setIsReceiptSync] = useState();
  const [IsKomoditiSync, setIsKomoditiSync] = useState();
  const date = Date.now();
  let d = new Date(date);

  let cDate = calculateDate(d);

  const logout = () => {
    Alert.alert('Konfirmasi', 'Apakah anda yakin ingin keluar?\n', [
      {
        text: 'TIDAK',
        onPress: () => console.log('Cancel Pressed'),
        style: { backgroundColor: 'red' },
      },
      {
        text: 'YA',
        onPress: () => {
          removeData('@user');
          // removeData('@bulanReceipt');
          RNRestart.Restart();
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (cDate.tanggal in transaksi) {
        setTagihan(transaksi[cDate.tanggal].totalTagihan);
        if (transaksi[cDate.tanggal].statusSync) {
          setIsReceiptSync(true);
        } else {
          setIsReceiptSync(false);
        }
      }
      console.log(komoditi);
      if (komoditi.statusSync) {
        setIsKomoditiSync(true);
      } else {
        setIsKomoditiSync(false);
      }
    });

    if (cDate.tanggal in transaksi) {
      setTagihan(transaksi[cDate.tanggal].totalTagihan);
      if (transaksi[cDate.tanggal].statusSync) {
        setIsReceiptSync(true);
      } else {
        setIsReceiptSync(false);
      }
    }
    if (komoditi.statusSync) {
      setIsKomoditiSync(true);
    } else {
      setIsKomoditiSync(false);
    }
    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 7 }}>
          <Text style={styles.city}>{user.kecamatan}</Text>
          <Text style={styles.person}>Petugas: {user.nama}</Text>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <View
              style={{
                backgroundColor: '#EB5757',
                padding: 10,
                borderRadius: 6,
              }}>
              <Icon name="logout" size={35} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#00A3FF', '#0084CE']}
          style={[styles.gradient, styles.shadow]}>
          <View style={styles.information}>
            <Text style={styles.cardInfo}>Jumlah setoran hari ini</Text>
            <Text style={styles.retribusi}>
              Rp {currencySeparator(tagihan)}
            </Text>
            <Text style={[styles.cardInfo, { marginTop: 10 }]}>
              {cDate.tanggal}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.actionBtnCont}>
        <TouchableWithoutFeedback
          disabled={IsReceiptSync}
          onPress={() => {
            navigation.navigate('Setoran');
          }}>
          <View
            style={[
              styles.actionBtn,
              styles.shadow,
              !IsReceiptSync ? {} : { backgroundColor: 'lightgray' },
            ]}>
            <Icon name="add" size={30} color="black" />
            <Text style={styles.actionBtnText}>Cetak Bukti</Text>
            <Text style={styles.actionBtnText}>Bayar</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          disabled={IsKomoditiSync}
          onPress={() => {
            // navigation.navigate('Komoditi');
            navigation.navigate('ListKomodity');
          }}>
          <View
            style={[
              styles.actionBtn,
              styles.shadow,
              !IsKomoditiSync ? {} : { backgroundColor: 'lightgray' },
            ]}>
            <Icon name="rate-review" size={30} color="black" />
            <Text style={styles.actionBtnText}>Entry Harga</Text>
            <Text style={styles.actionBtnText}>Komoditi</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            // navigation.navigate('SetorBukti');
            navigation.navigate('ListPenyetoran');
          }}>
          <View style={[styles.actionBtn, styles.shadow]}>
            <Icon name="cloud-upload" size={30} color="black" />
            <Text style={styles.actionBtnText}>Upload Bukti</Text>
            <Text style={styles.actionBtnText}>Bayar</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ flex: 2, marginTop: 30 }}>
        <TouchableOpacity
          disabled={IsKomoditiSync}
          style={[
            styles.buttonSync,
            !IsKomoditiSync
              ? { backgroundColor: '#47CEC0' }
              : { backgroundColor: 'lightgray' },
          ]}
          onPress={() => {
            navigation.navigate('AlertSync', { tipe: 'Komoditi' });
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="sync" size={30} color="white" />
            <Text style={[styles.text, { marginLeft: 5 }]}>KIRIM DATA KOMODITI</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={IsReceiptSync}
          style={[
            styles.buttonSync,
            !IsReceiptSync
              ? { backgroundColor: '#4DC1E6' }
              : { backgroundColor: 'lightgray' },
          ]}
          onPress={() => {
            navigation.navigate('AlertSync', { tipe: 'Receipt' });
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="sync" size={30} color="white" />
            <Text style={[styles.text, { marginLeft: 5 }]}>KIRIM BUKTI BAYAR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  city: {
    fontSize: 35,
    fontFamily: 'sans-serif-medium',
    color: '#3D3D3D',
  },
  person: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#3D3D3D',
  },
  card: {
    height: 150,
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    borderRadius: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  information: {
    padding: 10,
  },
  cardInfo: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif-light',
  },
  retribusi: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'sans-serif-medium',
  },
  buttonSync: {
    height: 45,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    letterSpacing: 3.5,
  },
  actionBtnCont: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: Dimensions.get('screen').width / 3.5,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontFamily: 'sans-serif-light',
  },
});

export default Home;
