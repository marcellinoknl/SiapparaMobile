/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { currencySeparator } from '../../../currency';

const labelColor = (message) => {
  switch (message) {
    case 'new':
      return { backgroundColor: '#2F80ED' };
    case 'confirm':
      return { backgroundColor: '#219653' };
    case 'waiting':
      return { backgroundColor: '#F2994A' };
    case 'canceled':
      return { backgroundColor: '#EB5757' };
    default:
      return { backgroundColor: 'black' };
  }
};

const labelHistoriPenyetoran = (message) => {
  switch (message) {
    case 2:
      return { backgroundColor: '#2F80ED' };
    case 1:
      return { backgroundColor: '#219653' };
    case 3: //pending
      return { backgroundColor: '#F2994A' };
    case 'pending':
      return { backgroundColor: '#EB5757' };
    default:
      return { backgroundColor: 'black' };
  }
};

export const ListViewTagihan = (props) => {
  const label = labelColor(props.status);
  return (
    <View style={styles.cont}>
      <View style={{ flex: 1, paddingLeft: 5, paddingVertical: 15 }}>
        <View style={[styles.circle, label]} />
      </View>
      <View style={{ flex: 10, padding: 10 }}>
        <Text style={{ fontFamily: 'sans-serif-light', fontSize: 14 }}>
          {props.waktu}
        </Text>
        <Text style={{ fontSize: 14 }}>
          {props.id}-{props.jenisPembayaran}
        </Text>
        <Text
          style={{ fontFamily: 'sans-serif-light', fontSize: 14, marginTop: 2 }}>
          Rp. {currencySeparator(props.harga)}
        </Text>
      </View>
    </View>
  );
};

export const ListViewKomoditi = (props) => {
  return (
    <View style={styles.cont}>
      <View style={{ flex: 10, padding: 10 }}>
        <Text style={{ fontSize: 20 }}>{props.number + 1}. {props.komoditi}</Text>
        <Text
          style={{ fontFamily: 'sans-serif-light', fontSize: 18, marginTop: 2 }}>
          Rp. {currencySeparator(props.harga)}
        </Text>
      </View>
    </View>
  );
};

export const ListViewPenyetoran = (props) => {
  return (
    <View style={styles.cont}>
      <View style={{ flex: 10, paddingVertical: 20, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 15 }}>{props.tanggal}</Text>
      </View>
      <View style={styles.chevron}>
        <Icon name="chevron-right" size={40} color="black" />
      </View>
    </View>
  );
};

export const ListViewHistoryPenyetoran = (props) => {
  const label = labelHistoriPenyetoran(props.status);
  return (
    <View style={styles.cont}>
      <View style={{ flex: 1, paddingLeft: 15, paddingVertical: 15 }}>
        <View style={[styles.circle, label]} />
      </View>
      <View style={{ flex: 10, padding: 10 }}>
        <Text style={{ fontFamily: 'sans-serif-light', fontSize: 16 }}>
          {props.tanggal}
        </Text>
        <Text
          style={{ fontFamily: 'sans-serif-light', fontSize: 25, marginTop: 2 }}>
          Rp. {currencySeparator(props.total)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  chevron: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginTop: 10,
  },
});
