/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const NoInternet = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height/1.2,
      }}>
      <Text style={{fontSize: 20, marginBottom: 20}}>Tidak ada koneksi internet</Text>
      <Icon
        name="signal-cellular-connected-no-internet-4-bar"
        size={70}
        color="black"
      />
    </View>
  );
};
export default NoInternet;
